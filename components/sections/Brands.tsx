import type { Brand } from "@/lib/types";
import { SectionTitle } from "../ui/SectionTitle";

export function Brands({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;

  return (
    <section id="brands" aria-labelledby="brands-title" className="bg-cream py-20 sm:py-28">
      <div className="container-site">
        <SectionTitle
          id="brands-title"
          eyebrow="Brands"
          title="Худалдаалдаг"
          accent="брэндүүд"
          subtitle="Брэнд бүрийн бэлэн байдал болон захиалгын боломжийг тусад нь шалгана."
        />
        <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:mt-14 sm:gap-3">
          {brands.map((b) => (
            <li
              key={b.id}
              className="rounded-full bg-paper px-5 py-2.5 font-serif text-[1.05rem] tracking-[0.06em] text-ink shadow-[0_6px_16px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-6 sm:py-3 sm:text-[1.2rem]"
            >
              {b.name}
            </li>
          ))}
          <li className="rounded-full px-5 py-2.5 font-serif text-[1.05rem] italic text-gold-deep sm:py-3 sm:text-[1.2rem]">
            болон бусад олон брэнд
          </li>
        </ul>
      </div>
    </section>
  );
}
