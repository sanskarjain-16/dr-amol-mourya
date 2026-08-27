import { Reveal } from "../../Reveal";
import { CheckCircle2 } from "lucide-react";

export default function WorkshopBenefits({ benefits }) {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              WHAT HAPPENS WHEN YOU LEARN WITH US
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <Reveal 
              key={idx} 
              delay={idx * 50} 
              className={`flex ${idx === 6 ? 'lg:col-start-2' : ''}`}
            >
              <div className="w-full group bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 bg-emerald-500/10 p-2 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
