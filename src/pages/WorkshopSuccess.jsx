import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Video, ArrowRight, Bell, AlertCircle, Loader2 } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabase';

// DEMO URL — replace with production welcome video before launch.
const DEMO_WELCOME_VIDEO_URL = "https://www.youtube.com/embed/cnXf3qMxXRc?si=RstxRgVfRT6_uMsE";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function WorkshopSuccess() {
  const [searchParams] = useSearchParams();
  const regId = searchParams.get('reg_id');
  
  // Status: 'processing' | 'confirmed' | 'failed' | 'invalid'
  const [status, setStatus] = useState(regId ? 'processing' : 'invalid');
  const [whatsappUrl, setWhatsappUrl] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('whatsapp_group_link')
          .eq('id', 1)
          .single();
        if (data && data.whatsapp_group_link) {
          setWhatsappUrl(data.whatsapp_group_link);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!regId) return;

    let attempts = 0;
    const maxAttempts = 15; // 30 seconds total
    let isMounted = true;

    const checkStatus = async () => {
      attempts++;
      try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/check-payment-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registration_id: regId })
        });

        if (!response.ok) {
          if (attempts >= maxAttempts && isMounted) setStatus('failed');
          return false;
        }

        const data = await response.json();
        
        if (data.registration_status === 'CONFIRMED' && data.razorpay_payment_id) {
          if (isMounted) setStatus('confirmed');
          return true;
        }

        if (attempts >= maxAttempts && isMounted) {
          setStatus('failed');
        }
        return false;
      } catch (err) {
        console.error("Error checking status:", err);
        if (attempts >= maxAttempts && isMounted) setStatus('failed');
        return false;
      }
    };

    // Check immediately
    checkStatus().then(done => {
      if (done) return;
      
      const interval = setInterval(async () => {
        const isDone = await checkStatus();
        if (isDone || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 2000);
      
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    });
    
    return () => { isMounted = false; };
  }, [regId]);

  if (status === 'invalid') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Registration Context</h1>
        <p className="text-slate-600 mb-6">We could not find a valid registration ID. Please ensure you clicked the link correctly.</p>
        <Link to="/workshop" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
          Go Back to Workshop
        </Link>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
        <Loader2 className="w-16 h-16 text-blue-500 mb-6 animate-spin" />
        <h1 className="text-3xl font-black text-slate-900 mb-4">Payment submitted. We're confirming your registration...</h1>
        <p className="text-xl text-slate-600 max-w-md">Please wait a moment while we securely verify your payment with the server.</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
        <AlertCircle className="w-16 h-16 text-orange-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Verification Delayed</h1>
        <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
          Your payment was received by Razorpay, but we're still confirming your workshop registration. 
          <br/><br/>
          <strong className="text-red-500">Please do not pay again.</strong>
          <br/><br/>
          Your registration is being verified by our system.
        </p>
      </div>
    );
  }

  // status === 'confirmed'
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-blue-600/20 pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Success Hero */}
        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12 text-center mb-8">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Registration Successful! 🎉
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto">
              Your seat for the <strong className="text-slate-900">RGC Champions Launchpad</strong> has been successfully reserved.
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-6 inline-block text-left border border-slate-100 shadow-sm w-full max-w-sm">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Registration Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Program</span>
                  <span className="font-bold text-slate-900">RGC Champions Launchpad</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Payment</span>
                  <span className="font-bold text-slate-900">₹97</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Registration Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800 uppercase">Payment confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Welcome Video Section */}
        <Reveal delay={0.1}>
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12 mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6">
              <Video className="w-4 h-4" />
              <span>Watch This First</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
              Welcome to RGC Champions Launchpad
            </h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
              <iframe
                src={DEMO_WELCOME_VIDEO_URL}
                title="Welcome Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp CTA */}
          {whatsappUrl && (
            <Reveal delay={0.2} className="h-full">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-lg border border-green-200 p-8 text-center h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Join Our WhatsApp Channel
              </h3>
              <p className="text-slate-700 text-sm mb-6 font-medium">
                Join our WhatsApp channel to receive workshop updates, announcements, reminders, and important information.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
              >
                <span>Join WhatsApp Channel</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>
          )}

          {/* What Happens Next */}
          <Reveal delay={0.3} className="h-full">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8 h-full">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 font-bold text-sm mb-6">
                <Bell className="w-4 h-4" />
                <span>What Happens Next?</span>
              </div>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Registration Confirmed</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Your payment is being verified securely.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Workshop Information</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">You will receive important workshop details and updates.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Stay Connected</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Join our WhatsApp channel so you don't miss announcements.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
