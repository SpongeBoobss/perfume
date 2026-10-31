"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { images, isPresized } from "@/lib/images";
import type { Settings } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ settings }: { settings: Settings }) {
  const reduce = useReducedMotion();
  const heroSrc = settings.hero_image || images.hero;
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, ease, delay: reduce ? 0 : 0.2 + i * 0.12 } }),
  };

  return (
    <section id="home" aria-labelledby="hero-title" className="container-site pt-2">
      <div className="relative isolate flex min-h-[44rem] items-end overflow-hidden rounded-[1.75rem] bg-[#140c09] sm:rounded-[2.25rem] lg:h-[min(82svh,48rem)] lg:min-h-[36rem] lg:items-center">
        {/* Photo sits on the right (top on mobile) and melts into the card colour, leaving the text side clear. */}
        <motion.div
          className="absolute inset-x-0 top-0 -z-10 h-[62%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[64%] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
          initial={{ scale: reduce ? 1 : 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src={heroSrc}
            unoptimized={isPresized(heroSrc)}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="w-full px-6 pb-10 sm:px-12 sm:pb-14 lg:max-w-[40rem] lg:px-16 lg:pb-0">
          <motion.p
            custom={0}
            variants={item}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.62rem] font-medium tracking-[0.14em] text-white sm:px-4 sm:text-[0.7rem] sm:tracking-[0.2em] backdrop-blur-md"
          >
            USA IMPORT <span aria-hidden className="h-1 w-1 rounded-full bg-gold-light" /> 100% ORIGINAL
          </motion.p>

          <motion.h1
            id="hero-title"
            custom={1}
            variants={item}
            initial="hidden"
            animate="show"
            className="mt-6 text-[2.6rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[4rem] lg:text-[4.6rem]"
          >
            {settings.hero_title}
            <br />
            <em className="font-serif font-normal italic tracking-normal text-gold-light">{settings.hero_accent}</em>{" "}
            {settings.hero_title_end}
          </motion.h1>

          <motion.p
            custom={2}
            variants={item}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed text-white/80 sm:text-[1.05rem]"
          >
            {settings.hero_subtitle}
          </motion.p>

          <motion.div custom={3} variants={item} initial="hidden" animate="show" className="mt-8">
            <a
              href="#preorder"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[0.88rem] font-medium text-ink shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Үнэртэн захиалах
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
