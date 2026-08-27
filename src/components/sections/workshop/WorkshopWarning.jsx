import { Reveal } from "../../Reveal";

export default function WorkshopWarning() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-1 lg:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-6 uppercase tracking-widest border border-red-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Warning
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
                This Workshop is <span className="text-red-600">NOT</span> For Everyone…
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                If you are looking for a get-rich-quick scheme or shortcuts that don't require actual work, this is the wrong place. But if you are ready to implement proven systems that scale... keep reading.
              </p>
            </Reveal>
          </div>
          <div className="order-2 lg:order-2">
            <Reveal delay={0.2}>
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-xl shadow-red-900/5">
                <img src="/images/chart2.jpg" alt="Growth Chart" className="w-full h-auto rounded-2xl mix-blend-multiply" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
