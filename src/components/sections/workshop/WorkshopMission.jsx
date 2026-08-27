import { Reveal } from "../../Reveal";

export default function WorkshopMission({ missionImages }) {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Reveal>
            <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">My Big Mission</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              To Empower <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">1 Lakh</span> Real Estate Entrepreneurs, 
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">1 Cr+</span> Jobs, and Save the lives of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">25 Lakh</span> Labours.
            </p>
          </Reveal>
        </div>

        {/* Split Layout: Why Trust Me? + Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <div>
            <Reveal delay={100}>
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
                Why Trust Me?
              </h3>
              <h4 className="text-2xl text-blue-600 font-bold mb-6">
                Because I was once a fresher too.
              </h4>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  I know exactly what it feels like to start from scratch. The uncertainty, the lack of leads, the closed doors, and the overwhelming fear of failure. I have lived through the grind of trying to make a name in a fiercely competitive industry without any godfather or huge capital.
                </p>
                <p>
                  Everything I teach in this workshop isn't just theory from a textbook—it is battle-tested strategy. It’s the exact roadmap I used to build a thriving real estate business from the ground up.
                </p>
                <p className="font-semibold text-slate-900">
                  If I can do it, I can show you exactly how to do it too.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Masonry Images Side */}
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            <div className="flex flex-col gap-4 pt-12">
              <Reveal delay={200} className="flex-1">
                <img src={missionImages[0]} alt="Dr Amol Seminars" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500" />
              </Reveal>
              <Reveal delay={300} className="flex-1">
                <img src={missionImages[1]} alt="Dr Amol Awards" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500" />
              </Reveal>
            </div>
            <div className="flex flex-col gap-4 pb-12">
              <Reveal delay={400} className="flex-1">
                <img src={missionImages[2]} alt="Dr Amol Coaching" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500" />
              </Reveal>
              <Reveal delay={500} className="flex-1">
                <img src={missionImages[3]} alt="Dr Amol Stage" className="w-full h-full object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500" />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
