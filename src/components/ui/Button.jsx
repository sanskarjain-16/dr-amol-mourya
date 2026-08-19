export default function Button({
  children,
  variant = "gold",
  className = "",
  ...props
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]";

  const variants = {
    gold: "bg-[image:var(--gradient-gold)] text-ink shadow-soft hover:shadow-lift hover:brightness-105",
    ink: "bg-primary text-primary-foreground shadow-soft hover:shadow-lift hover:brightness-110",
    outline: "border border-border bg-card text-foreground hover:border-gold hover:bg-secondary",
    ghostLight: "border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10",
  };

  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}