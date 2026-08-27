import { Reveal } from "../../Reveal";

export default function WorkshopFeatures({ workshop, featureIcons }) {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 bg-blue-100 rounded-full uppercase">
              The Blueprint
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              What Happens When You Join?
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshop.points.map((point, index) => {
            const isLastOdd = index === workshop.points.length - 1 && workshop.points.length % 2 !== 0;
            
            return (
              <Reveal 
                key={index} 
                delay={index * 0.1}
                className={isLastOdd ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className="group relative h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-400 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {featureIcons[index]}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {point.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
