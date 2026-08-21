import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "../data/site";
import { Reveal } from "../components/Reveal";

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

export default function Contact() {
  return (
    <main className="bg-background pb-16 sm:pb-24">
      {/* Header Section */}
      <section className="relative w-full overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-10 blur-[100px]"
        />
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 text-center md:px-12">
          <Reveal>
            <span className="eyebrow block text-gold-soft mb-4">Get in Touch</span>
            <h1 className="mb-6 font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              Ready to grow your real estate business?
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-white/80 md:text-xl">
              We're here to help. Reach out to our team today to discover how our coaching and systems can transform your results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Details & Map Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Direct Contact Info */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <h2 className="mb-8 font-display text-3xl font-medium text-foreground sm:text-4xl">
                Contact Information
              </h2>

              <ul className="space-y-8 text-lg text-foreground/80">
                <li className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href={`mailto:${contact.email}`} className="mt-1 block hover:text-gold-soft transition-colors break-words">
                      {contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <div className="mt-1 flex flex-col gap-1">
                      {contact.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-gold-soft transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Headquarters</p>
                    <p className="mt-1 text-foreground/70">{contact.address}</p>
                    <p className="mt-2 text-sm font-medium text-foreground/60">{contact.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-12">
                <h3 className="mb-4 font-display text-xl font-medium text-foreground">Follow Us</h3>
                <div className="flex gap-4">
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
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-all hover:bg-gold hover:text-ink hover:-translate-y-1"
                        aria-label={social.label}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Location Map */}
          <Reveal delay={200} className="h-[400px] w-full overflow-hidden rounded-3xl shadow-soft lg:h-full lg:min-h-[500px]">
            <iframe
              src="https://maps.google.com/maps?q=Anandam%20Business%20Centre,%20Ganeshpeth%20Colony,%20Nagpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Amol Mourya Headquarters"
              className="grayscale-[0.2] contrast-[1.05] filter transition-all hover:grayscale-0 hover:contrast-100"
            />
          </Reveal>

        </div>
      </section>
    </main>
  );
}
