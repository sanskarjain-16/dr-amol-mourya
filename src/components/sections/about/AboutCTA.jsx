import { useState } from 'react';
import { Reveal } from '../../Reveal'
import { aboutCta } from '../../../data/about'
import ButtonLink from '../../ui/ButtonLink'

export default function AboutCTA() {
  const [copied, setCopied] = useState(false);

  const handleLinkClick = () => {
    const email = aboutCta.cta.href.replace('mailto:', '');
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      }).catch(console.error);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 surface-ink text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <Reveal>
          <span className="eyebrow text-gold-soft mb-6 block">
            {aboutCta.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-10 leading-tight">
            {aboutCta.title}
          </h2>
          
          <div className="relative inline-flex flex-col items-center">
            <ButtonLink 
              href={aboutCta.cta.href}
              className="w-full sm:w-auto mt-2"
              onClick={handleLinkClick}
            >
              {aboutCta.cta.label}
            </ButtonLink>

            <div 
              className={`absolute -bottom-12 whitespace-nowrap text-[0.8rem] font-medium text-gold-soft bg-gold/10 px-4 py-2 rounded-full border border-gold/20 transition-all duration-300 ${
                copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              Copied {aboutCta.cta.href.replace('mailto:', '')} to clipboard!
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
