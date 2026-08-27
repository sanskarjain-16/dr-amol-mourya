import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function RegistrationModal({ isOpen, onClose, workshopId }) {
  const [status, setStatus] = useState("idle"); // idle, submitting, processing_payment, error
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const source = new URLSearchParams(window.location.search).get("source") || "organic";
    
    const customerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      lead_source: source,
      workshop_id: workshopId
    };

    try {
      // 1. Call edge function to create order
      const { data, error: functionError } = await supabase.functions.invoke("create-order", {
        body: customerData
      });

      if (functionError) throw new Error("Failed to initialize payment. Please try again.");
      
      const { order_id, registration_id, amount } = data;

      if (!order_id || !registration_id) {
        throw new Error("Invalid response from server.");
      }

      setStatus("processing_payment");

      // 2. Load Razorpay SDK
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error("Failed to load Razorpay SDK. Check your connection.");
      }

      // 3. Initialize Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: amount,
        currency: "INR",
        name: "Dr. Amol Mourya",
        description: "RGC Champions Launchpad Registration",
        order_id: order_id,
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone,
        },
        theme: {
          color: "#2563EB",
        },
        handler: function (response) {
          // On Success
          // We DO NOT trust this for marking payment as CONFIRMED in DB.
          // We just redirect to the success page which will poll the backend.
          window.location.href = `/workshop/success?reg_id=${registration_id}`;
        },
        modal: {
          ondismiss: function () {
            setStatus("idle");
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error(response.error);
        setStatus("idle");
        setErrorMsg("Payment failed or was cancelled. Please try again.");
      });
      
      rzp1.open();
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setStatus("error");
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

        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-900 mb-2">Reserve Your Seat</h3>
          <p className="text-slate-600 text-sm">
            Complete your registration for the RGC Champions Launchpad. The workshop fee is ₹97.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 flex items-start gap-3 rounded-xl text-sm font-medium border border-red-100 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              required 
              disabled={status === 'submitting' || status === 'processing_payment'}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Address *</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              required 
              disabled={status === 'submitting' || status === 'processing_payment'}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Phone Number *</label>
            <input 
              type="tel" 
              id="phone"
              name="phone" 
              required 
              disabled={status === 'submitting' || status === 'processing_payment'}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
              placeholder="+91 9876543210"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'processing_payment'}
            className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Order...
              </>
            ) : status === 'processing_payment' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Awaiting Payment...
              </>
            ) : (
              'Pay ₹97 to Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
