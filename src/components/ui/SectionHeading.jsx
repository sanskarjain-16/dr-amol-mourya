export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#C79A45]">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#17171A] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-[#6B6B73] sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}