import { Reveal } from "../../Reveal";

export default function WorkshopPillars() {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
                Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3 Pillars</span> of Real Estate Success
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mb-8"></div>
              <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
                If you want to make <strong className="text-slate-900 bg-blue-100 px-2 py-1 rounded">₹1 Lakh to ₹5 Lakh per month</strong>, you need the right system.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                In this 3-hour live workshop – the <strong className="text-blue-600">Right Skills</strong>, <strong className="text-blue-600">Right Tools</strong>, and <strong className="text-blue-600">Right Strategies</strong> come together to guarantee your success. Stop guessing and start following a proven blueprint used by top producers.
              </p>
            </Reveal>
          </div>

          {/* Infographic Image */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white transform hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-overlay"></div>
                <img 
                  src="/images/infographic.jpg" 
                  alt="3 Pillars of Real Estate Success" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
