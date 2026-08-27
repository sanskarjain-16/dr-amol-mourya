import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { CheckCircle2, XCircle } from "lucide-react";

export default function WaitlistModal({ isOpen, onClose }) {
  const [waitlistStatus, setWaitlistStatus] = useState('idle');
  const [waitlistError, setWaitlistError] = useState('');

  if (!isOpen) return null;

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistStatus('submitting');
    setWaitlistError('');
    
    const formData = new FormData(e.target);
    const source = new URLSearchParams(window.location.search).get('source') || 'organic';
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      lead_source: source
    };

    try {
      const { error } = await supabase
        .from('workshop_waitlist')
        .insert([data]);

      if (error) throw error;
      
      setWaitlistStatus('success');
      setTimeout(() => {
        onClose();
        setWaitlistStatus('idle');
      }, 3000);
    } catch (err) {
      console.error("Waitlist error:", err);
      setWaitlistError(err.message || 'Something went wrong. Please try again.');
      setWaitlistStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>

        {waitlistStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">You're on the list!</h3>
            <p className="text-slate-600">
              Thanks for your interest. We will notify you the moment our next workshop date is announced.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Join the Waitlist</h3>
              <p className="text-slate-600">
                Missed this workshop? Drop your details below and be the first to know when we open seats for the next one.
              </p>
            </div>

            {waitlistError && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {waitlistError}
              </div>
            )}

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  required 
                  disabled={waitlistStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  required 
                  disabled={waitlistStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone" 
                  required 
                  disabled={waitlistStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="+91 9876543210"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={waitlistStatus === 'submitting'}
                className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {waitlistStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Notify Me'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
