import { Reveal } from "../../Reveal";
import CountUpPkg from "react-countup";
const CountUp = CountUpPkg.default || CountUpPkg;

export default function WorkshopCoach({ coachStats }) {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              Meet Your Coach
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Coach Image */}
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-80"></div>
                <img 
                  src="/images/workshop-coach-photo.jpg" 
                  alt="Dr. Amol Mourya" 
                  className="w-full aspect-[542/770] object-cover object-[25%_top] relative z-0"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-3xl font-black text-white mb-2">Dr. Amol Mourya</h3>
                  <p className="text-blue-400 font-bold tracking-wide uppercase text-sm">Asia’s Leading Business Success Coach</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {coachStats.map((stat, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="group">
                    <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-3 group-hover:scale-105 transition-transform origin-left duration-300 inline-block">
                      <CountUp 
                        end={stat.value} 
                        duration={2.5} 
                        decimals={stat.decimals || 0}
                        enableScrollSpy 
                        scrollSpyOnce 
                      />
                      {stat.suffix}
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
