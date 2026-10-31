"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import type { Branch } from "@/lib/types";
import { MongoliaMap } from "../MongoliaMap";
import { SectionTitle } from "../ui/SectionTitle";

export function Locations({ branches }: { branches: Branch[] }) {
  const [activeId, setActiveId] = useState<string | null>(branches.find((b) => b.map_x !== null)?.id ?? null);
  const active = branches.find((b) => b.id === activeId);

  // Group by province, keeping the admin-defined order.
  const groups = branches.reduce<Record<string, Branch[]>>((acc, b) => {
    (acc[b.province] ??= []).push(b);
    return acc;
  }, {});

  return (
    <section id="locations" aria-labelledby="locations-title" className="container-site py-20 sm:py-28">
      <SectionTitle
        id="locations-title"
        eyebrow="Local partners"
        title="Орон нутгийн"
        accent="салбарууд"
        subtitle={`Одоогоор ${branches.length} дэлгүүрт оригинал үнэртэн нийлүүлж байна. Ойролцоох салбараа олоорой.`}
      />

      <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:items-start">
        <div className="rounded-[1.75rem] bg-cream p-4 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-7">
          <MongoliaMap branches={branches} activeId={activeId} onSelect={setActiveId} />
          <p className="mt-3 text-center text-[0.75rem] text-stone">Схем зураг. Байршил ойролцоо.</p>
        </div>

        <div className="space-y-8 lg:col-span-5">
          {Object.entries(groups).map(([province, list]) => (
            <div key={province}>
              <div className="flex items-baseline justify-between px-1">
                <h3 className="text-[1.15rem] font-semibold tracking-tight text-ink">{province}</h3>
                <span className="text-[0.78rem] text-stone">{list.length} салбар</span>
              </div>
              <ul className="mt-3 grid gap-2.5">
                {list.map((b) => {
                  const on = b.id === activeId;
                  return (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(b.id)}
                        aria-pressed={on}
                        className={`flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 ${
                          on
                            ? "bg-paper shadow-[0_16px_32px_-18px_rgba(0,0,0,0.35)] ring-1 ring-ink"
                            : "bg-paper ring-1 ring-line hover:ring-stone/40"
                        }`}
                      >
                        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream">
                          {b.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={b.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <MapPin aria-hidden strokeWidth={1.4} className="h-5 w-5 text-gold-deep" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-ink">{b.name}</span>
                          <span className="mt-0.5 block truncate text-[0.8rem] text-stone">
                            {b.address || "Хамтрагч борлуулалтын цэг"}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {active && (active.phone || active.hours) && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-2xl bg-ink px-5 py-4 text-[0.88rem] text-paper">
              <span className="font-medium">{active.name}</span>
              {active.phone && (
                <a href={`tel:${active.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 hover:text-gold-light">
                  <Phone aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  {active.phone}
                </a>
              )}
              {active.hours && (
                <span className="inline-flex items-center gap-2 text-paper/80">
                  <Clock aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  {active.hours}
                </span>
              )}
            </div>
          )}

          <p aria-live="polite" className="sr-only">
            {active ? `Сонгосон салбар: ${active.name}, ${active.province}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
