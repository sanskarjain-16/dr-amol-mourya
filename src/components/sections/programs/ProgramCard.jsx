import { Reveal } from "../../Reveal";

export default function ProgramCard({ program, index = 0 }) {

  return (
    <Reveal delay={index * 100}>
      <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 shadow-soft hover:shadow-lift hover:-translate-y-1 hover:border-accent/40 group">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {program.image ? (
            <img 
              src={program.image} 
              alt={program.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-ink text-gold-soft">
              <span className="font-display text-xl">{program.name?.charAt(0) || "P"}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-display text-ink mb-3 leading-tight">
            {program.name}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base font-light mb-6 flex-grow">
            {program.description}
          </p>

          <div className="pt-4 mt-auto border-t border-border flex items-center">
             {program.knowMoreUrl ? (
                <a 
                  href={program.knowMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-ink hover:text-gold-soft transition-colors"
                >
                  <span className="mr-2 uppercase tracking-widest text-xs">Know More</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
             ) : (
                <span className="inline-flex items-center text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Enrollment via Contact
                </span>
             )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
