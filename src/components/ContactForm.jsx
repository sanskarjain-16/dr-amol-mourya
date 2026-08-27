import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { finalCta } from "../data/site";
import { supabase } from "../lib/supabase";

export default function ContactForm({ theme = 'dark' }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      role: formData.get('role'),
    };

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (submitError) throw submitError;
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === 'dark';
  const containerClasses = isDark 
    ? "rounded-2xl border border-ink-foreground/12 bg-ink-foreground/5 p-5 backdrop-blur-sm sm:p-7"
    : "rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7";
  
  const textClasses = isDark ? "text-ink-foreground" : "text-foreground";
  const labelClasses = isDark ? "text-ink-foreground/85" : "text-foreground/85";
  const inputClasses = isDark 
    ? "border-ink-foreground/20 bg-ink text-ink-foreground placeholder:text-ink-foreground/40"
    : "border-border bg-background text-foreground placeholder:text-foreground/40 focus:ring-gold focus:border-gold outline-none focus-visible:outline-none";

  if (submitted) {
    return (
      <div className={`flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border ${isDark ? 'border-ink-foreground/12 bg-ink-foreground/5' : 'border-border bg-card'} p-8 text-center backdrop-blur-sm shadow-soft`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className={`mb-2 font-display text-2xl ${textClasses}`}>Message Sent</h3>
        <p className={`${isDark ? 'text-ink-foreground/70' : 'text-foreground/70'} leading-relaxed`}>
          Thank you for reaching out! Our team will contact you at the provided details within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className={containerClasses} onSubmit={handleSubmit}>
      <h3 className={`mb-6 font-display text-2xl font-medium ${textClasses}`}>
        Send us a message
      </h3>
      <div className="space-y-4">
        <Field id="name" label="Name" type="text" labelClasses={labelClasses} inputClasses={inputClasses} />
        <Field id="phone" label="Phone" type="tel" labelClasses={labelClasses} inputClasses={inputClasses} />
        <Field id="email" label="Email" type="email" labelClasses={labelClasses} inputClasses={inputClasses} />
        <div>
          <label htmlFor="role" className={`text-sm font-medium ${labelClasses}`}>
            Your role in real estate or want to be
          </label>
          <select
            id="role"
            name="role"
            defaultValue=""
            required
            className={`mt-2 min-h-12 w-full rounded-xl border px-4 text-sm ${inputClasses}`}
          >
            <option value="" disabled>
              Select your role
            </option>
            {finalCta.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 text-red-400 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 text-sm font-semibold text-ink shadow-soft transition-all hover:shadow-lift active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}

function Field({ id, label, type, labelClasses, inputClasses }) {
  return (
    <div>
      <label htmlFor={id} className={`text-sm font-medium ${labelClasses}`}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className={`mt-2 min-h-12 w-full rounded-xl border px-4 text-sm ${inputClasses}`}
      />
    </div>
  );
}
