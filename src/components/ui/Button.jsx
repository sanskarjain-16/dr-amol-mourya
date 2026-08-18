export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-[#17171A] text-white hover:bg-[#C79A45] hover:text-[#17171A]",

    secondary:
      "border border-[#17171A] text-[#17171A] hover:bg-[#17171A] hover:text-white",

    gold:
      "bg-[#C79A45] text-[#17171A] hover:bg-[#17171A] hover:text-white",

    light:
      "bg-white text-[#17171A] hover:bg-[#C79A45]",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}