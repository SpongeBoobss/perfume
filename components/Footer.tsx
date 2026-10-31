import { contactLinks } from "@/lib/contact";
import { navItems, siteConfig } from "@/lib/site-config";
import type { Settings } from "@/lib/types";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";
import { Wordmark } from "./ui/Wordmark";

export function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  const links = contactLinks(settings);
  const socials = [
    { label: "Facebook", href: links.facebook, icon: FacebookIcon },
    { label: "Instagram", href: links.instagram, icon: InstagramIcon },
  ].filter((s) => s.href);

  return (
    <footer className="bg-paper">
      <div className="container-site grid gap-10 py-14 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <Wordmark size="md" />
          <p className="mt-5 max-w-[34ch] text-[0.88rem] leading-relaxed text-stone">
            Дэлхийн алдартай брэндүүдийн 100% оригинал үнэртнийг АНУ-аас импортлон, бэлэн болон захиалгаар хүргэнэ.
          </p>
        </div>

        <nav aria-label="Хурдан холбоос" className="md:col-span-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {navItems
              .filter((n) => n.id !== "home")
              .map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[0.88rem] text-stone transition-colors hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        {socials.length > 0 && (
          <ul className="flex gap-2 md:col-span-2 md:justify-end">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.78rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p className="font-serif text-[0.95rem] italic text-gold-deep">{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
