import { useState, useEffect } from 'react';
import { Reveal } from '../Reveal';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    }
    return timeLeft;
  }

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch by not rendering the time until mounted on client
  if (!mounted) return null;

  return (
    <section className="relative z-20 px-6 -mt-16 mb-8">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/5 border border-white/50 flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Next Workshop Starts In</h3>
              <p className="text-slate-500 font-medium">Don't miss out on the opportunity to scale your business.</p>
            </div>

            <div className="flex gap-4 md:gap-6 justify-center">
              {Object.keys(timeLeft).map((interval) => (
                <div key={interval} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shadow-inner mb-2">
                    <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      {timeLeft[interval].toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {interval}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
