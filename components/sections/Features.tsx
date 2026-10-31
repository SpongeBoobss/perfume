import Image from "next/image";
import { images } from "@/lib/images";

const cards = [
  {
    title: "АНУ-аас импорт",
    text: "Америкаас шууд татан авч, найдвартай эх сурвалжаас хүргэнэ.",
    image: images.importCard,
    tilt: "md:-rotate-[4deg] md:translate-y-2",
  },
  {
    title: "100% оригинал",
    text: "Хуурамч, дуураймал биш — зөвхөн жинхэнэ брэндийн үнэртэн.",
    image: images.originalCard,
    tilt: "md:translate-y-8",
  },
  {
    title: "Захиалгын үйлчилгээ",
    text: "Дэлгүүрт байхгүй үнэртнийг таны хүсэлтээр захиалж авчирна.",
    image: images.preorderCard,
    tilt: "md:rotate-[4deg] md:translate-y-2",
  },
];

export function Features({ brandCount }: { brandCount: number }) {
  return (
    <section id="services" aria-label="Манай давуу тал" className="container-site py-20 sm:py-28">
      <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
        {cards.map((c) => (
          <li
            key={c.title}
            className={`rounded-[1.5rem] bg-paper p-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-500 ease-silk hover:rotate-0 hover:-translate-y-1 ${c.tilt}`}
          >
            <div className="px-2 pt-2">
              <h2 className="text-[1.2rem] font-semibold tracking-tight text-ink">{c.title}</h2>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-stone">{c.text}</p>
            </div>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[1rem]">
              <Image src={c.image} unoptimized alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-20 max-w-xl text-center sm:mt-24">
        <p className="text-[1.05rem] leading-relaxed text-stone sm:text-[1.15rem]">
          {brandCount}+ дэлхийн брэнд, бэлэн болон захиалгаар. Хүссэн үнэртнээ хэлээрэй —{" "}
          <span className="text-ink">бид АНУ-аас авчирна.</span>
        </p>
        <a
          href="#preorder"
          className="mt-8 inline-flex rounded-2xl bg-ink px-9 py-4 text-[1.05rem] font-medium text-paper shadow-[0_18px_36px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          Захиалга өгөх
        </a>
      </div>
    </section>
  );
}
