import { Reveal } from '../../Reveal'
import { aboutMeet } from '../../../data/about'

export default function CredentialsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {aboutMeet.highlights.map((highlight, index) => {
            // Split out potential numeric parts if they exist at the start
            // E.g., "3 Lakh+ People Trained" -> "3 Lakh+" "People Trained"
            // For simplicity, we just render the text prominently.
            const isFirstNumeric = highlight.match(/^[\d.]+\s?(Lakh\+|L\+|K\+|\+|)/);
            
            return (
              <Reveal key={index} delay={index * 100} className="flex flex-col items-center">
                <div className="text-xl md:text-2xl font-display font-medium text-foreground">
                  {highlight}
                </div>
                <div className="w-12 h-0.5 bg-gold mt-4 mb-2 rounded-full"></div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
