import { Mail, MapPin, Phone } from "lucide-react";
import { finalCta, contact } from "../../../data/site";
import { Reveal } from "../../Reveal";

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
        </Reveal>

        <Reveal delay={100}>
          <form
            className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/5 p-5 backdrop-blur-sm sm:p-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-4">
              <Field id="name" label="Name" type="text" />
              <Field id="phone" label="Phone" type="tel" />
              <Field id="email" label="Email" type="email" />
              <div>
                <label htmlFor="role" className="text-sm font-medium text-ink-foreground/85">
                  Your role in real estate or want to be
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue=""
                  className="mt-2 min-h-12 w-full rounded-xl border border-ink-foreground/20 bg-ink px-4 text-sm text-ink-foreground"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  {finalCta.roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 min-h-12 w-full rounded-full bg-[image:var(--gradient-gold)] px-6 text-sm font-semibold text-ink shadow-soft transition-all hover:shadow-lift active:scale-[0.98]"
            >
              Submit
            </button>
            <p className="mt-3 text-center text-xs text-ink-foreground/50">
              Placeholder: form submission is not connected in this phase.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ id, label, type }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-foreground/85">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="mt-2 min-h-12 w-full rounded-xl border border-ink-foreground/20 bg-ink px-4 text-sm text-ink-foreground placeholder:text-ink-foreground/40"
      />
    </div>
  );
}
