import { Reveal } from "../Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}) {
  const containerClasses = [
    "max-w-2xl",
    align === "center" ? "mx-auto text-center" : "",
    tone === "light" ? "text-ink-foreground" : "",
    className,
  ].filter(Boolean).join(" ");

  const eyebrowClasses = [
    "eyebrow",
    tone === "light" ? "text-gold-soft" : "text-accent",
  ].filter(Boolean).join(" ");

  const introClasses = [
    "mt-4 text-[0.975rem] leading-relaxed",
    tone === "light" ? "text-ink-foreground/70" : "text-muted-foreground",
  ].filter(Boolean).join(" ");

  return (
    <Reveal className={containerClasses}>
      {eyebrow ? (
        <p className={eyebrowClasses}>{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro ? (
        <p className={introClasses}>{intro}</p>
      ) : null}
    </Reveal>
  );
}