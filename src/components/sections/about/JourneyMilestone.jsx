import { useInView } from "../../Reveal";

export default function JourneyMilestone({ item, index, isLast }) {
  // Use the native useInView with once = false for repeatable animations
  const { ref, inView: isInView } = useInView(false);

  // Alternating layout on desktop
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-24 group"
    >
      {/* Mobile-only timeline vertical dot */}
      <div className="absolute left-0 top-0 bottom-0 w-8 lg:hidden flex justify-center mt-[3.5rem] z-20 pointer-events-none">
        <div
          className={`w-4 h-4 rounded-full border-2 relative transition-all duration-700 ${
            isInView ? "bg-[#d8b56a] border-[#d8b56a] scale-100" : "bg-transparent border-white/20 scale-75"
          }`}
        >
          {isInView && (
            <div className="absolute inset-0 rounded-full bg-gold blur-[2px] opacity-50" />
          )}
        </div>
      </div>

      {/* Desktop-only central timeline dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 justify-center items-center z-20 pointer-events-none">
        <div
          className={`w-5 h-5 rounded-full border-2 relative shadow-soft transition-all duration-700 ${
            isInView ? "bg-[#d8b56a] border-[#d8b56a] scale-100" : "bg-transparent border-white/20 scale-75"
          }`}
        >
          {isInView && (
             <div className="absolute inset-0 rounded-full bg-gold blur-[4px] opacity-60" />
          )}
        </div>
      </div>

      {/* Content Block */}
      <div
        className={`pl-12 lg:pl-0 flex flex-col justify-center transition-all duration-1000 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${
          isEven ? "lg:order-1 lg:text-right lg:pr-12" : "lg:order-2 lg:text-left lg:pl-12"
        }`}
      >
        <span className={`eyebrow text-gold-soft mb-4 block transition-opacity duration-700 ${
          isInView ? "opacity-100" : "opacity-50"
        }`}>
          0{index + 1} — {item.label}
        </span>
        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-display mb-6 leading-tight transition-colors duration-700 ${
          isInView ? "text-white" : "text-white/60"
        }`}>
          {item.title}
        </h3>
        <p className="text-white/80 font-light leading-relaxed text-base md:text-lg">
          {item.description}
        </p>
      </div>

      {/* Image Block */}
      <div
        className={`pl-12 lg:pl-0 mt-8 lg:mt-0 transition-all duration-1000 delay-100 ease-out ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${
          isEven ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
        }`}
      >
        <div className={`relative w-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-soft border border-white/10 bg-ink-soft ${
          isLast ? "aspect-[4/5] lg:aspect-square" : "aspect-[4/3] lg:aspect-[4/3]"
        }`}>
          <div className={`absolute inset-0 bg-ink/40 z-10 transition-opacity duration-700 ${
            isInView ? "opacity-0" : "opacity-100"
          }`} />
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{ objectPosition: item.imagePosition || 'center' }}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isInView ? "scale-100" : "scale-105"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
