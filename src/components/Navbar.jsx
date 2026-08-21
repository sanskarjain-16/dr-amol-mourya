import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { nav, hero } from "../data/site";
import logo from "../assets/images/logo.png";

const linkBase =
  "group rounded-full px-4 py-2 text-sm font-medium transition-colors";

function NavLink({
  item,
  onClick,
  className = "",
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  // Determine if the link is currently active
  const targetPath = item.href.split('#')[0] || '/';
  const isActive = targetPath === '/' ? isHome : location.pathname.startsWith(targetPath);

  const activeColorClass = isActive 
    ? "text-gold-soft" 
    : "text-ink-foreground/80 hover:text-gold-soft";
  
  const innerContent = (
    <span className="relative py-1 flex items-center justify-center">
      {item.label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold-soft to-gold/0 animate-[navSweep_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]" />
      )}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold-soft to-gold/0 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      )}
    </span>
  );

  let content;

  if (item.href.startsWith("/")) {
    content = (
      <Link
        to={item.href}
        onClick={onClick}
        className={`${linkBase} ${activeColorClass} ${className}`}
      >
        {innerContent}
      </Link>
    );
  } else if (item.href.startsWith("#")) {
    if (isHome) {
      content = (
        <a href={item.href} onClick={onClick} className={`${linkBase} ${activeColorClass} ${className}`}>
          {innerContent}
        </a>
      );
    } else {
      content = (
        <Link to={`/${item.href}`} onClick={onClick} className={`${linkBase} ${activeColorClass} ${className}`}>
          {innerContent}
        </Link>
      );
    }
  } else {
    content = (
      <Link to={item.href} onClick={onClick} className={`${linkBase} ${activeColorClass} ${className}`}>
        {innerContent}
      </Link>
    );
  }

  return content;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open || !isHome
          ? "border-b border-ink-foreground/10 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="Dr. Amol Mourya" className="h-8 w-auto shrink-0 sm:h-9" />
          <span className="sr-only">Dr. Amol Mourya — Home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          <Link
            to={hero.primaryCta.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 py-3 text-[0.8rem] font-semibold tracking-wide text-ink shadow-soft transition-all duration-200 hover:shadow-lift hover:brightness-105 active:scale-[0.98]"
          >
            {hero.primaryCta.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-foreground/25 text-ink-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-foreground/10 bg-ink px-4 pt-2 pb-8 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              onClick={() => setOpen(false)}
              className="border-b border-ink-foreground/10 py-4 text-2xl font-medium text-ink-foreground hover:text-gold-soft"
            />
          ))}
        </nav>
        <Link
          to={hero.primaryCta.href}
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold tracking-wide text-ink shadow-soft transition-all duration-200 hover:shadow-lift hover:brightness-105 active:scale-[0.98]"
        >
          {hero.primaryCta.label}
        </Link>
      </div>
    </header>
  );
}