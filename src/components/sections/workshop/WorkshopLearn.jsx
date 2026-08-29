import { Reveal } from "../../Reveal";

export default function WorkshopLearn() {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
              What You Will Learn In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3 Hrs?</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Image Side */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <Reveal delay={0.2}>
              <div className="relative z-10 max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full blur-3xl opacity-20 -z-10 transform scale-90"></div>
                <img 
                  src="/images/542x770-dr-amol-sir-rfcw3uzw0vscrzvcjknvv7wjlfufr4tntp10rfvwrk.png" 
                  alt="Dr. Amol Mourya" 
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white object-cover"
                  style={{ aspectRatio: "542/770" }}
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 hidden md:flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xl">3</div>
                  <div className="text-sm font-bold text-slate-700 leading-tight">Hours of<br/>Pure Value</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-12">
            <div className="flex flex-col gap-10">
              
              <Reveal delay={0.1}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-300">01.</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      Stop Chasing Customers
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-4">
                      Learn <strong>Pull Marketing</strong> and your clients will chase you.
                    </p>
                    <div className="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm">
                      <strong className="text-slate-900 block mb-1">Know Your Trap:</strong>
                      <span className="text-slate-600 text-sm">The 5 biggest signs that show you are still stuck in 'Survival' mode in your real estate business.</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-300">02.</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      Fix the 3 Mistakes
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      The 3 big, simple mistakes that keep Realtors from making big money.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-300">03.</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      Your Easy Action Plan
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      The only 10 things you need to focus on right now to start growing fast in Real Estate.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
