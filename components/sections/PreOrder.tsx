import Image from "next/image";
import { images } from "@/lib/images";
import { SectionTitle } from "../ui/SectionTitle";
import { OrderForm } from "./OrderForm";

const steps = ["Брэндийн нэрээ хэлнэ", "Үнэртний нэр, загвараа сонгоно", "Боломжтой бол зургаа илгээнэ", "Хэмжээ, хувилбараа тодорхойлно"];

export function PreOrder({ brandNames }: { brandNames: string[] }) {
  return (
    <section id="preorder" aria-labelledby="preorder-title" className="container-site py-20 sm:py-28">
      <div className="grid gap-10 rounded-[1.75rem] bg-cream p-5 sm:rounded-[2.25rem] sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div className="flex flex-col">
          <SectionTitle
            id="preorder-title"
            eyebrow="Pre-order"
            title="Хүссэн үнэртнээ"
            accent="захиал"
            align="left"
            subtitle="Дэлгүүрт байхгүй үнэртнийг АНУ-аас захиалан авчрах боломжийг судалж, тантай холбогдоно."
          />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 text-[0.9rem] text-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[0.75rem] font-medium text-paper">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="relative mt-8 hidden min-h-[14rem] flex-1 overflow-hidden rounded-[1.25rem] lg:block">
            <Image src={images.preorder} unoptimized alt="" fill sizes="40vw" className="object-cover" />
          </div>
        </div>

        <OrderForm brandNames={brandNames} />
      </div>
    </section>
  );
}
