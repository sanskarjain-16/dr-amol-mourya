import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { workshop } from "../data/site";
import { Helmet } from "react-helmet-async";

// Components
import WorkshopHero from "../components/sections/workshop/WorkshopHero";
import WorkshopFeatures from "../components/sections/workshop/WorkshopFeatures";
import WorkshopAudience from "../components/sections/workshop/WorkshopAudience";
import WorkshopPillars from "../components/sections/workshop/WorkshopPillars";
import WorkshopWarning from "../components/sections/workshop/WorkshopWarning";
import WorkshopLearn from "../components/sections/workshop/WorkshopLearn";
import WorkshopGallery from "../components/sections/workshop/WorkshopGallery";
import WorkshopCoach from "../components/sections/workshop/WorkshopCoach";
import WorkshopMission from "../components/sections/workshop/WorkshopMission";
import WorkshopBenefits from "../components/sections/workshop/WorkshopBenefits";
import WorkshopComparison from "../components/sections/workshop/WorkshopComparison";
import WorkshopFAQ from "../components/sections/workshop/WorkshopFAQ";
import WorkshopCTA from "../components/sections/workshop/WorkshopCTA";
import WaitlistModal from "../components/sections/workshop/WaitlistModal";

// Icons mapping for features
const featureIcons = [
  <svg key="1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  <svg key="3" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="4" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  <svg key="5" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
];

const targetAudience = [
  { title: "Freshers", text: "If you are a fresher and want to launch a rich, accelerated career in the dynamic world of real estate, this workshop provides the essential fundamentals and networking opportunities you need to start strong." },
  { title: "Working Professionals", text: "If you are a working professional looking to start real estate business as a side Income, you'll gain practical strategies to enter the market and leverage your existing skills for maximum profit without investing more time." },
  { title: "Women Entrepreneurs", text: "If you are an ambitious woman entrepreneur seeking to build an independent identity in real estate, this program empowers you and equips you with essential mindset shifts you need." },
  { title: "Real Estate Agents & Brokers", text: "If you are an agent or broker aiming to significantly boost your client conversions and average deal value, you will learn advanced negotiation tactics and exclusive market analysis techniques" },
  { title: "Small Real Estate Builder-Developers", text: "If you are a small real estate builder-developer or a developer focused on optimizing project launch and sales velocity, you will discover proven marketing and demand-generation strategies to reduce inventory time." },
  { title: "Real Estate Channel Partners", text: "If you are a channel partner seeking to expand your network and secure high-value agreements, this training will equip you with essential partnership management and lead-generation frameworks." },
  { title: "Real Estate Referral Partners", text: "If you are a referral partner looking to systematize and maximize your passive income stream, you will learn how to identify, nurture, and convert high-quality leads consistently." },
  { title: "Real Estate Marketing Agency Owners", text: "If you are a Real Estate marketing agency owner and need to deliver superior ROI for your developer and agent clients, you will master the latest digital strategies and marketing tactics for the Real Estate market." }
];

const galleryImages = [
  "/images/6255951030537359283.jpg",
  "/images/6255951030537359284.jpg",
  "/images/6255951030537359285.jpg",
  "/images/6255951030537359286.jpg",
  "/images/6255951030537359287.jpg",
  "/images/6255951030537359288.jpg",
  "/images/6255951030537359289.jpg",
  "/images/6255951030537359290.jpg",
];

const coachStats = [
  { value: 20, suffix: "+", label: "Years of Proven Training & Coaching Excellence" },
  { value: 1, suffix: "M+", label: "Entrepreneurs Reached in the Last 20 Years" },
  { value: 600, suffix: "+", label: "Seminars and Workshops Conducted" },
  { value: 2.5, suffix: "L+", decimals: 1, label: "Social Media Followers Across Platforms" },
  { value: 3.5, suffix: "L+", decimals: 1, label: "Paid Learners" },
  { value: 500, suffix: "+", label: "Growth-Focused Business Owners Connected" },
  { value: 100, suffix: "+", label: "Cities Trained In" },
  { value: 300, suffix: "+", label: "CEOs Interacted With" },
];

const missionImages = [
  "/images/edit-for-webiste-13.jpg",
  "/images/edit-for-webiste-3.jpg",
  "/images/edit-for-webiste-6.jpg",
  "/images/photo_2025-08-07_11-08-37.jpg"
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
  { question: "Is this workshop suitable for beginners or is it more advanced?", answer: "Yes, it is perfectly suitable for beginners! As mentioned earlier, even if you are a fresher, you will learn the exact step-by-step roadmap to start your real estate journey." },
  { question: "What topics will be covered during the workshop?", answer: "We will cover pull marketing, avoiding the biggest mistakes realtors make, building a strong action plan, and strategies to generate high-quality leads consistently." },
  { question: "Will there be any additional costs or hidden charges associated with attending the workshop?", answer: "No! Your registration fee covers the complete 3-hour live workshop. There are absolutely no hidden charges." },
  { question: "Is there any prior knowledge or qualifications required to attend the workshop?", answer: "None at all. Whether you have zero experience or are already working in the industry, the strategies taught are easy to understand and implement." },
  { question: "Will there be any opportunities to ask questions during the workshop?", answer: "Yes, we encourage interaction. There will be dedicated Q&A segments where you can get your specific doubts clarified directly by Dr. Amol." },
  { question: "What kind of support or resources will be provided after the workshop for further learning and development in real estate?", answer: "You will receive actionable frameworks and worksheets during the session, plus information on how to join our advanced mentorship programs if you choose to take the next step." },
  { question: "After the workshop, will you be able to provide a recording?", answer: "To ensure high engagement and immediate action-taking, this is a live interactive experience. Recordings are typically not provided, so make sure you attend live!" }
];

export default function Workshop() {
  const [workshopDate, setWorkshopDate] = useState(null);
  const [workshopLocation, setWorkshopLocation] = useState('NAGPUR, MAHARASHTRA');
  const [workshopId, setWorkshopId] = useState(null);

  useEffect(() => {
    async function fetchDate() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('workshop_date, workshop_location')
          .eq('id', 1)
          .single();
          
        if (error) throw error;
        if (data) {
          if (data.workshop_date) setWorkshopDate(data.workshop_date);
          if (data.workshop_location) setWorkshopLocation(data.workshop_location);
        }

        const { data: wsData, error: wsError } = await supabase
          .from('workshops')
          .select('id, date, location')
          .eq('is_active', true)
          .single();
          
        if (wsData) {
          if (wsData.date) setWorkshopDate(wsData.date);
          if (wsData.location) setWorkshopLocation(wsData.location);
          if (wsData.id) setWorkshopId(wsData.id);
        }
      } catch (err) {
        console.error("Error fetching workshop date:", err);
        setWorkshopDate("2026-08-25T18:00:00+05:30"); // Fallback
      }
    }
    fetchDate();
  }, []);

  let formattedDate = "Loading...";
  let formattedTime = "Loading...";
  
  if (workshopDate) {
    const startDate = new Date(workshopDate);
    formattedDate = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
    const startTimeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const endTimeStr = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    formattedTime = `${startTimeStr} - ${endTimeStr} IST`;
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-600/20">
      <Helmet>
        <title>Offline Real Estate Workshop | Dr. Amol Mourya</title>
        <meta name="description" content="Join Dr. Amol Mourya live for a 3-hour offline workshop to master the 3 pillars of real estate success." />
      </Helmet>

      <WorkshopHero 
        workshopLocation={workshopLocation}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        workshopDate={workshopDate}
        onWaitlistClick={() => window.location.href = "https://leadmachine.dramolmourya.com/index.php/workshop/"}
      />
      
      <WorkshopFeatures workshop={workshop} featureIcons={featureIcons} />
      <WorkshopAudience targetAudience={targetAudience} />
      <WorkshopPillars />
      <WorkshopWarning />
      <WorkshopLearn />
      <WorkshopGallery galleryImages={galleryImages} />
      <WorkshopCoach coachStats={coachStats} />
      <WorkshopMission missionImages={missionImages} />
      <WorkshopBenefits benefits={benefits} />
      <WorkshopComparison doNotEnroll={doNotEnroll} mustEnroll={mustEnroll} />
      <WorkshopFAQ faqData={faqData} />
      <WorkshopCTA onWaitlistClick={() => window.location.href = "https://leadmachine.dramolmourya.com/index.php/workshop/"} />

    </div>
  );
}
