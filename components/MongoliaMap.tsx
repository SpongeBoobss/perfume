"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Branch } from "@/lib/types";

export const MAP_W = 1010;
export const MAP_H = 510;

// Simplified national outline and province shapes — a schematic, not a survey map.
export const MONGOLIA =
  "M24 148 L75 112 L150 86 L225 104 L315 68 L357 18 L405 40 L456 54 L510 99 L582 97 L645 144 L714 148 L780 130 L822 101 L891 119 L924 135 L987 261 L912 274 L861 315 L798 349 L747 396 L702 441 L615 454 L540 490 L444 450 L282 441 L249 373 L195 337 L117 324 L111 265 L90 207 L48 180 Z";

/** Provinces with a drawn outline, keyed by the name stored on a branch. */
const PROVINCE_SHAPES: Record<string, { d: string; label: { x: number; y: number; anchor: "start" | "end" } }> = {
  Дорноговь: {
    d: "M636 292 L729 279 L768 324 L798 349 L747 396 L702 441 L636 452 L618 382 Z",
    label: { x: 812, y: 408, anchor: "start" },
  },
  Өмнөговь: {
    d: "M411 355 L510 333 L570 355 L618 382 L636 452 L615 454 L540 490 L444 450 L396 414 Z",
    label: { x: 428, y: 486, anchor: "end" },
  },
};

const CAPITAL = { x: 597, y: 207, name: "Улаанбаатар" };

type Props = {
  branches: Branch[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function MongoliaMap({ branches, activeId, onSelect }: Props) {
  const placed = branches.filter((b) => b.map_x !== null && b.map_y !== null);
  const active = placed.find((b) => b.id === activeId) ?? null;
  const usedProvinces = new Set(branches.map((b) => b.province));

  return (
    <div className="relative w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Монгол улсын схем зураг, салбаруудын байршилтай."
      >
        <defs>
          <pattern id="mm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1" fill="#E4E3DF" />
          </pattern>
        </defs>

        <path d={MONGOLIA} fill="#FFFFFF" stroke="#CFCCC6" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={MONGOLIA} fill="url(#mm-dots)" />

        {Object.entries(PROVINCE_SHAPES)
          .filter(([name]) => usedProvinces.has(name))
          .map(([name, shape]) => {
            const on = active?.province === name;
            return (
              <g key={name}>
                <path
                  d={shape.d}
                  fill="#B38D4F"
                  fillOpacity={on ? 0.3 : 0.14}
                  stroke="#B38D4F"
                  strokeWidth={on ? 1.4 : 1}
                  strokeLinejoin="round"
                  style={{ transition: "fill-opacity .6s cubic-bezier(.22,1,.36,1)" }}
                />
                <text
                  x={shape.label.x}
                  y={shape.label.y}
                  textAnchor={shape.label.anchor}
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontStyle="italic"
                  fill="#8A6A35"
                  fontSize="24"
                >
                  {name}
                </text>
              </g>
            );
          })}

        <g>
          <circle cx={CAPITAL.x} cy={CAPITAL.y} r="4" fill="none" stroke="#6B6965" strokeWidth="1.2" />
          <circle cx={CAPITAL.x} cy={CAPITAL.y} r="1.4" fill="#6B6965" />
          <text x={CAPITAL.x + 10} y={CAPITAL.y - 8} fontFamily="var(--font-sans), Arial, sans-serif" fontSize="15" fill="#6B6965">
            {CAPITAL.name}
          </text>
        </g>
      </svg>

      {/* Markers are real buttons so they work with keyboard and screen readers. */}
      {placed.map((b) => (
        <Marker key={b.id} branch={b} active={b.id === activeId} onSelect={onSelect} />
      ))}

      <AnimatePresence>{active && <MarkerCard key={active.id} branch={active} />}</AnimatePresence>
    </div>
  );
}

function pct(b: Branch) {
  return { left: `${(b.map_x! / MAP_W) * 100}%`, top: `${(b.map_y! / MAP_H) * 100}%` };
}

function Marker({ branch, active, onSelect }: { branch: Branch; active: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(branch.id)}
      aria-pressed={active}
      aria-label={`${branch.name}, ${branch.province}`}
      className="group absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={pct(branch)}
    >
      {active && <span aria-hidden className="marker-pulse absolute h-3 w-3 rounded-full bg-gold" />}
      <span
        aria-hidden
        className={`relative block rounded-full border-2 border-paper shadow-[0_0_0_1px_#B38D4F] transition-all duration-500 ease-silk ${
          active ? "h-4 w-4 bg-ink" : "h-3 w-3 bg-gold group-hover:h-4 group-hover:w-4"
        }`}
      />
    </button>
  );
}

function MarkerCard({ branch }: { branch: Branch }) {
  // Flip the card to the left of the marker when the marker is in the right half.
  const flip = branch.map_x! > MAP_W * 0.62;
  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      style={pct(branch)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`absolute bottom-5 w-max max-w-[12rem] rounded-xl bg-paper px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 ${
          flip ? "right-0" : "left-0"
        }`}
      >
        <p className="font-medium leading-tight text-ink">{branch.name}</p>
        <p className="mt-0.5 text-[0.72rem] text-stone">{branch.province}</p>
      </div>
    </motion.div>
  );
}
