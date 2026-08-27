import { Reveal } from "../../Reveal";

export default function WorkshopAudience({ targetAudience }) {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Who’s this workshop for?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover if the RGC Blueprint is the right fit to scale your real estate ambitions.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((audience, index) => (
            <Reveal 
              key={index} 
              delay={index * 0.05} 
              className="h-full"
            >
              <div className="group h-full p-8 rounded-3xl bg-slate-50 hover:bg-blue-600 transition-colors duration-500 flex flex-col items-start border border-slate-100 shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-white text-green-500 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-500">
                  {audience.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
                  {audience.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
