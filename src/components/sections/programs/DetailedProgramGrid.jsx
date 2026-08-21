import { detailedPrograms } from "../../../data/programsDetailed";
import { ArrowRight, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../../Reveal";

export default function DetailedProgramGrid() {
  return (
    <div className="bg-slate-50 relative z-10 selection:bg-blue-600/20">
      {detailedPrograms.map((program, index) => {
        const isEven = index % 2 === 0;

        return (
          <section key={program.id} className="relative border-b border-slate-200 overflow-hidden">
            {/* The Layout */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Sticky Sidebar Info */}
                <div className="w-full lg:w-5/12">
                  <div className="sticky top-32 space-y-8">
                    <Reveal>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-widest mb-4 shadow-sm border border-blue-200">
                        <Target className="w-4 h-4" />
                        {program.subtitle}
                      </div>

                      <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                        {program.title}
                      </h2>

                      <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-video lg:aspect-[4/3] relative group">
                        <img 
                          src={program.image} 
                          alt={program.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />
                      </div>
                      
                      <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                        {program.description}
                      </p>

                      {program.primaryCta && (
                        program.primaryCta.href.startsWith("/") ? (
                          <Link 
                            to={program.primaryCta.href}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 w-full sm:w-auto"
                          >
                            {program.primaryCta.label}
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        ) : (
                          <a 
                            href={program.primaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 w-full sm:w-auto"
                          >
                            {program.primaryCta.label}
                            <ArrowRight className="w-5 h-5" />
                          </a>
                        )
                      )}
                    </Reveal>
                  </div>
                </div>

                {/* Scrolling Content (Modules & Audience) */}
                <div className="w-full lg:w-7/12 space-y-8 lg:space-y-12">
                  <Reveal delay={100}>
                    <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="bg-emerald-100 p-4 rounded-2xl shrink-0 shadow-inner">
                          <Users className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 tracking-tight">Who is this for?</h3>
                          <p className="text-slate-600 leading-relaxed font-medium text-lg">
                            {program.whoIsFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <div className="relative pl-2 sm:pl-4 mt-8">
                    {/* Vertical connecting line */}
                    <div className="absolute left-[1.85rem] sm:left-[2.35rem] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-100 via-slate-200 to-transparent" />
                    
                    <div className="space-y-10">
                      {program.modules.map((mod, i) => (
                        <Reveal key={i} delay={200 + (i * 50)}>
                          <div className="relative flex items-start gap-6 sm:gap-8 group">
                            {/* Step Number Circle */}
                            <div className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-[4px] border-slate-50 shadow-sm shrink-0 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300 group-hover:scale-110">
                              <span className="text-blue-600 font-black text-sm sm:text-base tracking-tighter">
                                {mod.number}
                              </span>
                            </div>
                            
                            {/* Content */}
                            <div className="pt-2 pb-2">
                              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {mod.title}
                              </h4>
                              <p className="text-slate-600 text-base leading-relaxed">
                                {mod.text}
                              </p>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>

                  {program.secondaryCta && (
                    <Reveal delay={300}>
                      <div className="pt-8 pb-4">
                        {program.secondaryCta.href.startsWith("/") ? (
                          <Link 
                            to={program.secondaryCta.href}
                            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group text-lg"
                          >
                            {program.secondaryCta.label}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                          </Link>
                        ) : (
                          <a 
                            href={program.secondaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors group text-lg"
                          >
                            {program.secondaryCta.label}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                          </a>
                        )}
                      </div>
                    </Reveal>
                  )}
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
