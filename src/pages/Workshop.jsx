import { Reveal } from "../components/Reveal";
import { Link } from "react-router-dom";
import CountUpPkg from "react-countup";
import { workshop } from "../data/site";
import CountdownTimer from "../components/ui/CountdownTimer";
import { 
  CheckCircle2,
  XCircle,
  ChevronDown
} from "lucide-react";

const CountUp = CountUpPkg.default || CountUpPkg;

// Hero icons mapping for features
const featureIcons = [
  // Understand the Market (Globe/Search)
  <svg key="1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  // Close Bigger Deals (Handshake/Chart)
  <svg key="2" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  // Get Daily Customer Leads (Users/Magnet)
  <svg key="3" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  // Build a Strong Team (User Group)
  <svg key="4" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  // Join a Big Network (Network/Hub)
  <svg key="5" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
];

const targetAudience = [
  {
    title: "Freshers",
    text: "If you are a fresher and want to launch a rich, accelerated career in the dynamic world of real estate, this workshop provides the essential fundamentals and networking opportunities you need to start strong.",
  },
  {
    title: "Working Professionals",
    text: "If you are a working professional looking to start real estate business as a side Income, you'll gain practical strategies to enter the market and leverage your existing skills for maximum profit without investing more time.",
  },
  {
    title: "Women Entrepreneurs",
    text: "If you are an ambitious woman entrepreneur seeking to build an independent identity in real estate, this program empowers you and equips you with essential mindset shifts you need.",
  },
  {
    title: "Real Estate Agents & Brokers",
    text: "If you are an agent or broker aiming to significantly boost your client conversions and average deal value, you will learn advanced negotiation tactics and exclusive market analysis techniques",
  },
  {
    title: "Small Real Estate Builder-Developers",
    text: "If you are a small real estate builder-developer or a developer focused on optimizing project launch and sales velocity, you will discover proven marketing and demand-generation strategies to reduce inventory time.",
  },
  {
    title: "Real Estate Channel Partners",
    text: "If you are a channel partner seeking to expand your network and secure high-value agreements, this training will equip you with essential partnership management and lead-generation frameworks.",
  },
  {
    title: "Real Estate Referral Partners",
    text: "If you are a referral partner looking to systematize and maximize your passive income stream, you will learn how to identify, nurture, and convert high-quality leads consistently.",
  },
  {
    title: "Real Estate Marketing Agency Owners",
    text: "If you are a Real Estate marketing agency owner and need to deliver superior ROI for your developer and agent clients, you will master the latest digital strategies and marketing tactics for the Real Estate market.",
  }
];

const galleryImages = [
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359283.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359284.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359285.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359286.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359287.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359288.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359289.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2026/07/6255951030537359290.jpg",
];

const coachStats = [
  { value: 20, suffix: "+", label: "Years of Proven Training & Coaching Excellence" },
  { value: 1, suffix: "M+", label: "Entrepreneurs Reached in the Last 20 Years" },
  { value: 600, suffix: "+", label: "Seminars and Workshops Conducted" },
  { value: 2.5, suffix: "L+", decimals: 1, label: "Social Media Followers Across Platforms" },
  { value: 3.5, suffix: "L+", decimals: 1, label: "Paid Learners" },
  { value: 500, suffix: "+", label: "Growth-Focused Business Owners Connected" },
  { value: 100, suffix: "+", label: "Cities Trained In" },
];

const missionImages = [
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2024/11/edit-for-webiste-13.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2024/11/edit-for-webiste-3.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2024/11/edit-for-webiste-6.jpg",
  "https://leadmachine.dramolmourya.com/wp-content/uploads/2025/12/photo_2025-08-07_11-08-37.jpg"
];

const benefits = [
  "You will move faster towards success.",
  "You learn directly from an industry expert with over 20+ years of experience.",
  "You get in-depth sales and marketing knowledge for realtors.",
  "You will learn from our mistakes and avoid mistakes.",
  "You get expert feedback and mentorship.",
  "You network with realtors from across India.",
  "You will get to celebrate your success."
];

const doNotEnroll = [
  "If you think you know everything.",
  "If you don't want to invest in learning new skills, strategies, and tools for your business.",
  "If you're not an action taker.",
  "If you're incapable of decision making.",
  "If you want to stay as you are and do not want growth.",
  "If you don't want to break your comfort zone."
];

const mustEnroll = [
  "If you're passionate to learn & grow your business.",
  "If you know the importance of investing in learning skills, strategies & tools.",
  "If you're an action taker.",
  "If you're a smart decision maker.",
  "If you want to skyrocket your real estate sales game.",
  "If you're ready to come out of your comfort zone."
];

const faqData = [
  {
    question: "Is this workshop suitable for beginners or is it more advanced?",
    answer: "Yes, it is perfectly suitable for beginners! As mentioned earlier, even if you are a fresher, you will learn the exact step-by-step roadmap to start your real estate journey."
  },
  {
    question: "What topics will be covered during the workshop?",
    answer: "We will cover pull marketing, avoiding the biggest mistakes realtors make, building a strong action plan, and strategies to generate high-quality leads consistently."
  },
  {
    question: "Will there be any additional costs or hidden charges associated with attending the workshop?",
    answer: "No! Your registration fee covers the complete 3-hour live workshop. There are absolutely no hidden charges."
  },
  {
    question: "Is there any prior knowledge or qualifications required to attend the workshop?",
    answer: "None at all. Whether you have zero experience or are already working in the industry, the strategies taught are easy to understand and implement."
  },
  {
    question: "Will there be any opportunities to ask questions during the workshop?",
    answer: "Yes, we encourage interaction. There will be dedicated Q&A segments where you can get your specific doubts clarified directly by Dr. Amol."
  },
  {
    question: "What kind of support or resources will be provided after the workshop for further learning and development in real estate?",
    answer: "You will receive actionable frameworks and worksheets during the session, plus information on how to join our advanced mentorship programs if you choose to take the next step."
  },
  {
    question: "After the workshop, will you be able to provide a recording?",
    answer: "To ensure high engagement and immediate action-taking, this is a live interactive experience. Recordings are typically not provided, so make sure you attend live!"
  }
];

export default function Workshop() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-600/20">
      
      {/* Hero Section */}
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
              <span>NAGPUR, MAHARASHTRA</span>
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
                <span className="text-xl font-bold text-blue-600">25th August 2026</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Time</span>
                <span className="text-xl font-bold text-slate-800">6:00 PM - 9:00 PM IST</span>
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
              <Link 
                to="#register" 
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white uppercase tracking-widest transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                <span>Reserve My Seat</span>
                <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
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

      <CountdownTimer targetDate="2026-08-25T18:00:00+05:30" />

      {/* Features Section (What Happens When You Join) */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 md:mb-24">
            <Reveal>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 bg-blue-100 rounded-full uppercase">
                The Blueprint
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                What Happens When You Join?
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshop.points.map((point, index) => {
              // Make the last item span two columns on desktop if there's an odd number, for a cool bento look
              const isLastOdd = index === workshop.points.length - 1 && workshop.points.length % 2 !== 0;
              
              return (
                <Reveal 
                  key={index} 
                  delay={index * 0.1}
                  className={isLastOdd ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <div className="group relative h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    
                    {/* Subtle corner glow on hover */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-400 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        {featureIcons[index]}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {point.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* Target Audience Section (Who is this workshop for?) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 md:mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
                Who’s this workshop for?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Discover if the RGC Blueprint is the right fit to scale your real estate ambitions.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <Reveal 
                key={index} 
                delay={index * 0.05} 
                className="h-full"
              >
                <div className="group h-full p-8 rounded-3xl bg-slate-50 hover:bg-blue-600 transition-colors duration-500 flex flex-col items-start border border-slate-100 shadow-sm hover:shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-white text-green-500 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-500">
                    {audience.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
                    {audience.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3 Pillars Section */}
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

      {/* Not For Everyone Section */}
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

      {/* What You Will Learn Section */}
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
                  {/* Decorative background blob */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full blur-3xl opacity-20 -z-10 transform scale-90"></div>
                  <img 
                    src="https://leadmachine.dramolmourya.com/wp-content/uploads/elementor/thumbs/542x770-dr-amol-sir-rfcw3uzw0vscrzvcjknvv7wjlfufr4tntp10rfvwrk.png" 
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
                
                {/* Point 1 */}
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

                {/* Point 2 */}
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

                {/* Point 3 */}
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

      {/* Infinite Gallery Marquee Section */}
      <section className="py-20 bg-white border-t border-slate-100 overflow-hidden relative">
        
        <div className="w-full flex group">
          {/* 
             The marquee animation moves from 0% to -50%. 
             Since we duplicate the list inside, it creates a seamless loop.
          */}
          <div 
            className="flex w-max shrink-0 group-hover:[animation-play-state:paused]"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {[...galleryImages, ...galleryImages].map((imgUrl, idx) => (
              <div key={idx} className="w-80 h-64 mx-4 shrink-0 overflow-hidden rounded-2xl shadow-md border border-slate-100">
                <img 
                  src={imgUrl} 
                  alt="Workshop Attendees" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Coach Section */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
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

      {/* Big Mission & Trust Section */}
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

      {/* Benefits Section */}
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

      {/* Enroll Comparison Section */}
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

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <details className="group bg-slate-50 border border-slate-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-bold cursor-pointer list-none text-slate-800 text-lg md:text-xl p-6 transition-colors hover:text-blue-600">
                    <span className="pr-8">{faq.question}</span>
                    <span className="transition-transform duration-300 group-open:-rotate-180 flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
                      <ChevronDown className="w-6 h-6 text-blue-600" />
                    </span>
                  </summary>
                  <div className="text-slate-600 text-lg leading-relaxed px-6 pb-6 pt-0 border-t border-slate-100 mt-2">
                    <div className="pt-4">{faq.answer}</div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
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
              <a 
                href="https://rzp.io/rzp/4K6pqWmw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-2 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] animate-[shine_3s_infinite_ease-in-out]"></div>
                <span className="relative flex items-center gap-2">
                  Register Now at Rs. 97 /- !!
                </span>
              </a>
            </div>
            
            <p className="mt-8 text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Secure Payment Checkout
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
