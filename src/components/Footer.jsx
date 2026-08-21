import { Link, useLocation } from "react-router-dom";
import { nav, footer, contact } from "../data/site";
import logo from "../assets/images/logo.png";

const Facebook = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Youtube = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

function FooterNavLink({ item }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (item.href.startsWith("/")) {
    return (
      <Link to={item.href} className="hover:text-gold-soft">
        {item.label}
      </Link>
    );
  } else if (item.href.startsWith("#")) {
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
  } else {
    return (
      <Link to={item.href} className="hover:text-gold-soft">
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
                let Icon;
                if (s.label.toLowerCase() === 'facebook') Icon = Facebook;
                else if (s.label.toLowerCase() === 'instagram') Icon = Instagram;
                else if (s.label.toLowerCase() === 'youtube') Icon = Youtube;
                else if (s.label.toLowerCase() === 'linkedin') Icon = Linkedin;

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
                <li key={s}>
                  <Link to="/programs" className="hover:text-gold-soft transition-colors">
                    {s}
                  </Link>
                </li>
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