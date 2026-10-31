type Props = {
  id: string;
  eyebrow: string;
  /** Title before the italic accent word. */
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

/** Section heading: small eyebrow, tight sans title with an italic serif accent word. */
export function SectionTitle({ id, eyebrow, title, accent, subtitle, align = "center", tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <header className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className={`text-[0.72rem] font-medium tracking-[0.2em] ${light ? "text-gold-light" : "text-gold-deep"}`}>
        {eyebrow.toUpperCase()}
      </p>
      <h2
        id={id}
        className={`mt-3 text-[2.2rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[3rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className={`font-serif font-normal italic tracking-normal ${light ? "text-gold-light" : "text-gold-deep"}`}>
              {accent}
            </em>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[1rem] leading-relaxed ${light ? "text-white/75" : "text-stone"}`}>{subtitle}</p>
      )}
    </header>
  );
}
