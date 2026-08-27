import { Mail, MapPin, Phone } from "lucide-react";
import { finalCta, contact } from "../../../data/site";
import { Reveal } from "../../Reveal";
import ContactForm from "../../ContactForm";
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

export default function FinalCta() {

  return (
    <section id="contact" className="surface-ink relative isolate overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold opacity-10 blur-3xl"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-gold-soft">{finalCta.eyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight text-balance text-ink-foreground sm:text-4xl lg:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-foreground/70">{finalCta.text}</p>

          <ul className="mt-8 space-y-4 text-sm text-ink-foreground/80">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="min-w-0 break-words hover:text-gold-soft">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" aria-hidden="true" />
              <span className="flex flex-wrap gap-x-2">
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="hover:text-gold-soft"
                  >
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" aria-hidden="true" />
              <span className="min-w-0">{contact.address}</span>
            </li>
          </ul>

          <div className="mt-10">
            <h3 className="text-sm font-semibold text-ink-foreground">Follow Us</h3>
            <div className="mt-4 flex gap-4">
              {contact.social.map((social) => {
                let Icon;
                if (social.label.toLowerCase() === 'facebook') Icon = Facebook;
                else if (social.label.toLowerCase() === 'instagram') Icon = Instagram;
                else if (social.label.toLowerCase() === 'youtube') Icon = Youtube;
                else if (social.label.toLowerCase() === 'linkedin') Icon = Linkedin;
                
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-foreground/5 text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
                    aria-label={social.label}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm theme="dark" />
        </Reveal>
      </div>
    </section>
  );
}


