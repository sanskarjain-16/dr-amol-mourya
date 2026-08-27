import { Reveal } from "../../Reveal";
import CountdownTimer from "../../ui/CountdownTimer";

export default function WorkshopHero({ 
  workshopLocation, 
  formattedDate, 
  formattedTime, 
  workshopDate,
  onWaitlistClick 
}) {
  return (
    <>
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        
        {/* Subtle Background Pattern/Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Location Tag */}
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-10 shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{workshopLocation.toUpperCase()}</span>
            </div>
          </Reveal>
          
          {/* Main Headline */}
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.1]">
              REAL ESTATE OFFLINE <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">WORKSHOP</span>
            </h1>
          </Reveal>

          {/* Date & Time Highlight Box */}
          <Reveal delay={0.2}>
            <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-white border-2 border-slate-100 shadow-xl shadow-blue-900/5 rounded-2xl px-8 py-6 mb-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</span>
                <span className="text-xl font-bold text-slate-800">3-Hour Workshop</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Date</span>
                <span className="text-xl font-bold text-blue-600">{formattedDate}</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Time</span>
                <span className="text-xl font-bold text-slate-800">{formattedTime}</span>
              </div>
            </div>
          </Reveal>

          {/* Value Proposition */}
          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join Dr. Amol Mourya live for 3 hours and learn the <strong className="text-slate-900 font-bold">3-Step System</strong> to start attracting quality clients and move towards making <strong className="text-blue-600 font-bold">₹1 Lakh to ₹5 Lakh per month</strong> without any office or employee in Real Estate.
            </p>
          </Reveal>

          {/* Primary CTA */}
          <Reveal delay={0.4}>
            <div className="flex flex-col items-center justify-center">
              <button 
                onClick={onWaitlistClick}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white uppercase tracking-widest transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                <span>Reserve My Seat</span>
                <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="mt-4 text-sm font-medium text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout • Limited Seats Available
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {workshopDate && <CountdownTimer targetDate={workshopDate} />}
    </>
  );
}
