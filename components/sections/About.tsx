import Image from "next/image";
import { images } from "@/lib/images";

export function About({ brandCount, branchCount }: { brandCount: number; branchCount: number }) {
  const figures = [
    { value: `${brandCount}+`, label: "Дэлхийн брэнд" },
    { value: "100%", label: "Оригинал бүтээгдэхүүн" },
    { value: String(branchCount), label: "Орон нутгийн салбар" },
    { value: "USA", label: "Импортын эх сурвалж" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="container-site pb-20 sm:pb-28">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
        <div className="absolute inset-0 -z-10">
          <Image src={images.about} unoptimized alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>
        {/* Photo fades into the page at the bottom, as in a magazine spread. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/40 to-paper" />

        <div className="grid gap-8 px-6 pb-40 pt-14 sm:px-12 sm:pb-56 sm:pt-20 lg:grid-cols-2 lg:px-16">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.2em] text-gold-light">БИДНИЙ ТУХАЙ</p>
            <h2
              id="about-title"
              className="mt-3 text-[2.2rem] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[3rem]"
            >
              Дэлхийн брэнд,{" "}
              <em className="font-serif font-normal italic tracking-normal text-gold-light">найдвартай</em> эх
              сурвалжаас.
            </h2>
          </div>
          <div className="space-y-4 text-[0.98rem] leading-relaxed text-white/85 lg:pt-8">
            <p>
              Бид дэлхийн алдартай үнэртний брэндүүдийн бүтээгдэхүүнийг АНУ-аас импортлон Монголын хэрэглэгчдэд
              хүргэдэг.
            </p>
            <p>
              Зөвхөн бэлэн бараагаар хязгаарлагдахгүй — дэлгүүрт байхгүй брэнд, загвар, үнэртнийг таны хүсэлтээр
              захиалан авчирна.
            </p>
          </div>
        </div>
      </div>

      <dl className="relative -mt-24 grid grid-cols-2 gap-3 px-2 sm:-mt-32 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-16">
        {figures.map((f) => (
          <div
            key={f.label}
            className="rounded-[1.25rem] bg-paper p-5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:p-7"
          >
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block text-[2.4rem] font-medium leading-none tracking-[-0.03em] text-ink sm:text-[3rem]">
                {f.value}
              </span>
              <span className="mt-2 block text-[0.82rem] text-stone">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
