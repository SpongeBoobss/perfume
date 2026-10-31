import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contactLinks } from "@/lib/contact";
import type { Settings } from "@/lib/types";
import { FacebookIcon, InstagramIcon } from "../ui/SocialIcons";
import { SectionTitle } from "../ui/SectionTitle";

type Card = { label: string; icon: ReactNode; value: string; href: string | null; external?: boolean };

function handleFromUrl(url: string) {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    return path ? `@${path.split("/").pop()}` : url;
  } catch {
    return url;
  }
}

export function Contact({ settings: s }: { settings: Settings }) {
  const links = contactLinks(s);
  const cards: Card[] = [
    { label: "Утас", icon: <Phone className="h-5 w-5" strokeWidth={1.4} aria-hidden />, value: s.phone, href: links.phone },
    { label: "И-мэйл", icon: <Mail className="h-5 w-5" strokeWidth={1.4} aria-hidden />, value: s.email, href: links.email },
    {
      label: "Facebook",
      icon: <FacebookIcon className="h-5 w-5" />,
      value: s.facebook ? handleFromUrl(s.facebook) : "",
      href: links.facebook,
      external: true,
    },
    {
      label: "Instagram",
      icon: <InstagramIcon className="h-5 w-5" />,
      value: s.instagram ? handleFromUrl(s.instagram) : "",
      href: links.instagram,
      external: true,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-cream py-20 sm:py-28">
      <div className="container-site">
        <SectionTitle
          id="contact-title"
          eyebrow="Contact"
          title="Холбоо"
          accent="барих"
          subtitle="Асуулт, захиалга, хамтын ажиллагааны талаар бидэнтэй холбогдоорой."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                  {card.icon}
                </span>
                <span className="mt-6 block text-[0.78rem] text-stone">{card.label}</span>
                <span className={`mt-1 block break-all font-medium ${card.value ? "text-ink" : "text-stone/70"}`}>
                  {card.value || "Тун удахгүй"}
                </span>
              </>
            );
            const cls = "flex h-full flex-col items-start rounded-[1.25rem] bg-paper p-6 ring-1 ring-black/5";
            return (
              <li key={card.label}>
                {card.href ? (
                  <a
                    href={card.href}
                    {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group ${cls} transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>

        {s.address && (
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-[0.9rem] text-stone">
            <MapPin aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            {s.address}
          </p>
        )}
      </div>
    </section>
  );
}
