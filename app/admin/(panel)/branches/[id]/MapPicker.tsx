"use client";

import { useState } from "react";
import { MAP_H, MAP_W, MONGOLIA } from "@/components/MongoliaMap";

type Point = { x: number; y: number } | null;
type Other = { id: string; name: string; map_x: number | null; map_y: number | null };

/** Click-to-place picker on the schematic map. Writes map_x / map_y hidden inputs. */
export function MapPicker({ x, y, others }: { x: number | null; y: number | null; others: Other[] }) {
  const [point, setPoint] = useState<Point>(x !== null && y !== null ? { x, y } : null);

  function place(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setPoint({ x: Math.round(p.x), y: Math.round(p.y) });
  }

  return (
    <div>
      <input type="hidden" name="map_x" value={point?.x ?? ""} />
      <input type="hidden" name="map_y" value={point?.y ?? ""} />
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        onClick={place}
        className="w-full cursor-crosshair rounded-xl bg-cream"
        role="img"
        aria-label="Байршил сонгох газрын зураг"
      >
        <path d={MONGOLIA} fill="#FFFFFF" stroke="#CFCCC6" strokeWidth="1.5" strokeLinejoin="round" />
        {others.map((o) => (
          <g key={o.id}>
            <circle cx={o.map_x!} cy={o.map_y!} r="6" fill="#B38D4F" opacity="0.35" />
            <text x={o.map_x! + 10} y={o.map_y! + 5} fontSize="16" fill="#6B6965" opacity="0.7">
              {o.name}
            </text>
          </g>
        ))}
        {point && (
          <g>
            <circle cx={point.x} cy={point.y} r="18" fill="#141414" opacity="0.12" />
            <circle cx={point.x} cy={point.y} r="8" fill="#141414" stroke="#fff" strokeWidth="3" />
          </g>
        )}
      </svg>
      <div className="mt-3 flex items-center justify-between text-[0.82rem] text-stone">
        <span>{point ? `x ${point.x}, y ${point.y}` : "Байршил сонгоогүй — газрын зураг дээр харагдахгүй."}</span>
        {point && (
          <button type="button" onClick={() => setPoint(null)} className="underline-offset-4 hover:text-ink hover:underline">
            Арилгах
          </button>
        )}
      </div>
    </div>
  );
}
