"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, siteConfig, type SectionId } from "@/lib/site-config";
import { Wordmark } from "./ui/Wordmark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-shadow duration-500 ${
          scrolled || open ? "shadow-[0_1px_0_0_#E8E7E4]" : ""
        }`}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#home" aria-label="Original Perfume — нүүр хуудас" onClick={() => setOpen(false)}>
            <Wordmark size="sm" />
          </a>

          <nav aria-label="Үндсэн цэс" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems
                .filter((n) => n.id !== "home")
                .map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`rounded-full px-3.5 py-2 text-[0.84rem] transition-colors duration-300 ${
                          isActive ? "bg-cream text-ink" : "text-stone hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#preorder"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.82rem] font-medium text-paper shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Захиалах
            </a>
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Цэс хаах" : "Цэс нээх"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Гар утасны цэс"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-site flex flex-col pt-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.03 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-4 text-[1.5rem] font-medium tracking-tight ${
                      active === item.id ? "text-ink" : "text-stone"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-site mt-8 pb-10">
              <a
                href="#preorder"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-ink py-4 text-[0.95rem] font-medium text-paper"
              >
                Үнэртэн захиалах
              </a>
              <p className="mt-6 text-center font-serif text-lg italic text-gold-deep">{siteConfig.slogan}</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
