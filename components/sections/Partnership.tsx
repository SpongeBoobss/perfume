import Image from "next/image";
import { images } from "@/lib/images";
import { partnershipHref } from "@/lib/contact";
import type { Settings } from "@/lib/types";
import { SectionTitle } from "../ui/SectionTitle";

const offers = [
  "Үнэртний бөөний нийлүүлэлт",
  "Брэндийн бүтээгдэхүүний захиалга",
  "Барааны сонголт, нийлүүлэлтийн хамтын ажиллагаа",
  "Орон нутгийн худалдааны цэгүүдтэй урт хугацааны түншлэл",
];

export function Partnership({ settings }: { settings: Settings }) {
  return (
    <section id="partnership" aria-labelledby="partnership-title" className="container-site pb-20 sm:pb-28">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-noir px-6 py-14 sm:rounded-[2.25rem] sm:px-12 sm:py-20 lg:px-16">
        <div className="absolute inset-0 -z-10">
          <Image src={images.partnership} unoptimized alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover opacity-45" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionTitle
              id="partnership-title"
              eyebrow="Wholesale & partnership"
              title="Хамтдаа"
              accent="хөгжицгөөе."
              align="left"
              tone="light"
              subtitle="Орон нутгийн дэлгүүр, үнэртний худалдаа эрхлэгчидтэй хамтран ажиллахад бид нээлттэй."
            />
            <a
              href={partnershipHref(settings)}
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-[0.88rem] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Хамтран ажиллах
            </a>
          </div>
          <ul className="grid gap-2.5">
            {offers.map((o) => (
              <li
                key={o}
                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-[0.95rem] text-white backdrop-blur-md"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
