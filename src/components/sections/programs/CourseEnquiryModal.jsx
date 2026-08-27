import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function CourseEnquiryModal({ isOpen, onClose, courseName }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    
    const formData = new FormData(e.target);
    const data = {
      course_name: courseName,
      name: formData.get('name').trim(),
      phone: formData.get('phone').trim(),
      email: formData.get('email').trim(),
      message: formData.get('message').trim(),
    };

    if (!data.name || !data.phone) {
      setErrorMsg('Name and Phone are required.');
      setStatus('error');
      return;
    }

    try {
      // Retrieve attribution data from localStorage
      let attributionData = {};
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('rgc_attribution');
        if (stored) {
          try {
            attributionData = JSON.parse(stored);
          } catch (e) {}
        }
      }

      const { error } = await supabase
        .from('course_enquiries')
        .insert([{
          course_name: data.course_name,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          message: data.message || null,
          acquisition_source: attributionData.acquisition_source || 'WEBSITE',
          utm_source: attributionData.utm_source || null,
          utm_medium: attributionData.utm_medium || null,
          utm_campaign: attributionData.utm_campaign || null,
          utm_content: attributionData.utm_content || null,
          landing_page: attributionData.landing_page || null,
        }]);

      if (error) throw error;
      
      setStatus('success');
    } catch (err) {
      console.error("Enquiry error:", err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={() => status !== 'submitting' && onClose()}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={status === 'submitting'}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Thank You!</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your enquiry has been received successfully. Our team will contact you shortly regarding <strong>{courseName}</strong>.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-widest rounded-full mb-4">
                Course Enquiry
              </span>
              <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">
                {courseName}
              </h2>
              <p className="text-slate-500 text-sm">
                Interested in this course? Fill in your details and our team will contact you shortly.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="enquiry-name" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="enquiry-name"
                  name="name" 
                  required 
                  minLength={2}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  placeholder="Rahul Sharma"
                />
              </div>

              <div>
                <label htmlFor="enquiry-phone" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  id="enquiry-phone"
                  name="phone" 
                  required 
                  minLength={10}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="enquiry-email" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <input 
                  type="email" 
                  id="enquiry-email"
                  name="email" 
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  placeholder="rahul@example.com"
                />
              </div>

              <div>
                <label htmlFor="enquiry-message" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Message / Requirement <span className="text-slate-400 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <textarea 
                  id="enquiry-message"
                  name="message" 
                  rows={3}
                  maxLength={500}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
                  placeholder="I would like to know more about..."
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
