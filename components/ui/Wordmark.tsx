import { siteConfig } from "@/lib/site-config";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** "dark" for light backgrounds (default), "light" for noir backgrounds. */
  tone?: "dark" | "light";
};

const sizes = {
  sm: { primary: "text-[1.15rem]", secondary: "text-[0.52rem]" },
  md: { primary: "text-[1.4rem]", secondary: "text-[0.58rem]" },
  lg: { primary: "text-[2rem]", secondary: "text-[0.7rem]" },
};

const tones = {
  dark: { primary: "text-ink", secondary: "text-gold-deep", rule: "bg-gold" },
  light: { primary: "text-noir-ivory", secondary: "text-gold-bright", rule: "bg-gold-bright" },
};

/**
 * Typographic logo. Replace with an <Image> of the official logo when available.
 */
export function Wordmark({ className = "", size = "md", tone = "dark" }: Props) {
  const s = sizes[size];
  const t = tones[tone];
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`font-serif font-normal tracking-[0.28em] ${t.primary} ${s.primary}`}>
        {siteConfig.wordmark.primary}
      </span>
      <span
        className={`mt-1.5 flex items-center gap-2 font-sans font-medium tracking-[0.55em] ${t.secondary} ${s.secondary}`}
      >
        <span aria-hidden className={`h-px w-3 ${t.rule}`} />
        <span className="-mr-[0.55em]">{siteConfig.wordmark.secondary}</span>
        <span aria-hidden className={`h-px w-3 ${t.rule}`} />
      </span>
    </span>
  );
}
