import { Reveal } from "../../Reveal";
import { CheckCircle2 } from "lucide-react";

export default function WorkshopCTA({ onWaitlistClick }) {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden text-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Real Estate Offline Workshop <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">In Nagpur</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium">
            Don't wait. Seats are filling up fast for this exclusive event!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onWaitlistClick}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-2 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] animate-[shine_3s_infinite_ease-in-out]"></div>
              <span className="relative flex items-center gap-2">
                Register Now at Rs. 97 /- !!
              </span>
            </button>
          </div>
          
          <p className="mt-8 text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% Secure Payment Checkout
          </p>
        </Reveal>
      </div>
    </section>
  );
}
