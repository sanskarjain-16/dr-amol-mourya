export default function ButtonLink({
  children,
  href,
  variant = "gold",
  className = "",
  ...props
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]";

  const variants = {
    gold:
      "bg-gradient-to-r from-[#E8B75A] to-[#C9943D] text-[#17171A] shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:brightness-105",

    ink:
      "bg-[#17171A] text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:brightness-110",

    outline:
      "border border-black/10 bg-white text-[#17171A] hover:border-[#C79A45] hover:bg-[#F7F6F2]",

    ghostLight:
      "border border-white/25 text-white hover:bg-white/10",
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}