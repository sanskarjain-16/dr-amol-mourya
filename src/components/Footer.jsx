import { Link, useLocation } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { nav, footer, contact } from "../data/site";
import logo from "../assets/images/logo.png";

const icons = { Facebook: null, Instagram: null, YouTube: PlayCircle, LinkedIn: null };

function FooterNavLink({ item }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (item.href === "/about") {
    return (
      <Link to="/about/" className="hover:text-gold-soft">
        {item.label}
      </Link>
    );
  }
  if (item.href === "#home") {
    if (isHome) {
      return (
        <a href="#home" className="hover:text-gold-soft">
          {item.label}
        </a>
      );
    } else {
      return (
        <Link to="/" className="hover:text-gold-soft">
          {item.label}
        </Link>
      );
    }
  }
  
  if (isHome) {
    return (
      <a href={item.href} className="hover:text-gold-soft">
        {item.label}
      </a>
    );
  } else {
    return (
      <Link to={`/${item.href}`} className="hover:text-gold-soft">
        {item.label}
      </Link>
    );
  }
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-foreground/10 bg-ink py-12 text-ink-foreground sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="Dr. Amol Mourya" className="h-9 w-auto" loading="lazy" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-foreground/65">
              {footer.blurb}
            </p>
            <ul className="mt-5 flex gap-3">
              {contact.social.map((s) => {
                const Icon = icons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink-foreground/20 transition-colors hover:border-gold hover:text-gold-soft"
                    >
                      {Icon ? <Icon className="h-4.5 w-4.5" aria-hidden="true" /> : <span className="text-xs font-semibold">{s.label.slice(0, 2)}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-wide text-gold-soft">Quick Links</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-foreground/70">
              {nav.map((n) => (
                <li key={n.label}>
                  <FooterNavLink item={n} />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-gold-soft">Services</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-foreground/70">
              {footer.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-gold-soft">Headquarters</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-ink-foreground/70">
              <p>RGC Headquarters</p>
              <p>{contact.hqAddress}</p>
              <p>{contact.hours}</p>
              <p className="flex flex-wrap gap-x-2">
                Contact Us on
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="hover:text-gold-soft"
                  >
                    {p.replace("+91 ", "")}
                  </a>
                ))}
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="break-words hover:text-gold-soft">
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <p className="mt-10 border-t border-ink-foreground/10 pt-6 text-center text-xs text-ink-foreground/50">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}