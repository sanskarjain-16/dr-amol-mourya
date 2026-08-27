import { Reveal } from "../../Reveal";
import { CheckCircle2, XCircle } from "lucide-react";

export default function WorkshopComparison({ doNotEnroll, mustEnroll }) {
  return (
    <section className="py-24 px-6 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
              Here’s How This Workshop Will Change Your Life Forever
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Do Not Enroll (Red Column) */}
          <Reveal delay={100} className="h-full">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-red-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <XCircle className="w-48 h-48 text-red-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">
                  DO <span className="text-red-500">NOT</span> ENROLL…
                </h3>
                <ul className="space-y-6">
                  {doNotEnroll.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <XCircle className="w-6 h-6 text-red-500" />
                      </div>
                      <p className="text-lg text-slate-700 font-medium">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Must Enroll (Green Column) */}
          <Reveal delay={200} className="h-full">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-emerald-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <CheckCircle2 className="w-48 h-48 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">
                  YOU <span className="text-emerald-500">MUST</span> ENROLL…
                </h3>
                <ul className="space-y-6">
                  {mustEnroll.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <p className="text-lg text-slate-700 font-medium">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
