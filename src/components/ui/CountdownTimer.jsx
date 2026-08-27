import { useState, useEffect } from 'react';
import { Reveal } from '../Reveal';

export default function CountdownTimer({ targetDate }) {
  const [timerState, setTimerState] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  function calculateTimeLeft() {
    const now = +new Date();
    const target = +new Date(targetDate);
    const difference = target - now;
    
    // 3 hours in milliseconds
    const threeHours = 3 * 60 * 60 * 1000;

    if (difference > 0) {
      return {
        status: difference <= threeHours ? 'URGENT' : 'UPCOMING',
        time: {
          Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Minutes: Math.floor((difference / 1000 / 60) % 60),
          Seconds: Math.floor((difference / 1000) % 60),
        }
      };
    } else if (difference <= 0 && difference > -threeHours) {
      return { status: 'LIVE', time: { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 } };
    } else {
      return { status: 'CONCLUDED', time: { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 } };
    }
  }

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimerState(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch by not rendering the time until mounted on client
  if (!mounted) return null;

  return (
    <section className="relative z-20 px-6 -mt-16 mb-8">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className={`backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${
            timerState.status === 'LIVE' 
              ? 'bg-red-50/90 shadow-red-900/10 border-red-200' 
              : timerState.status === 'URGENT'
              ? 'bg-orange-50/90 shadow-orange-900/10 border-orange-200'
              : 'bg-white/80 shadow-blue-900/5 border-white/50'
          }`}>
            
            <div className="text-center md:text-left">
              <h3 className={`text-2xl md:text-3xl font-black mb-2 ${
                timerState.status === 'LIVE' ? 'text-red-700' : 
                timerState.status === 'URGENT' ? 'text-orange-700' : 'text-slate-900'
              }`}>
                {timerState.status === 'LIVE' ? 'Workshop is Live!' : 
                 timerState.status === 'CONCLUDED' ? 'Workshop Concluded' : 
                 timerState.status === 'URGENT' ? 'Hurry up! Workshop going live in:' :
                 'Next Workshop Starts In'}
              </h3>
              <p className={
                timerState.status === 'LIVE' ? 'text-red-600/80 font-bold' : 
                timerState.status === 'URGENT' ? 'text-orange-700/80 font-bold' : 'text-slate-500 font-medium'
              }>
                {timerState.status === 'LIVE' ? 'Join the session now to scale your business.' : 
                 timerState.status === 'CONCLUDED' ? 'Stay tuned for the next workshop announcement.' :
                 timerState.status === 'URGENT' ? 'Secure your seat right now before we close.' :
                 'Don\'t miss out on the opportunity to scale your business.'}
              </p>
            </div>

            <div className="flex gap-4 md:gap-6 justify-center">
              {timerState.status === 'LIVE' ? (
                <div className="px-8 py-4 bg-white rounded-2xl flex items-center gap-3 shadow-sm border border-red-100">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                  </span>
                  <span className="text-2xl font-black text-red-600 tracking-wider">LIVE NOW</span>
                </div>
              ) : (
                Object.keys(timerState.time).map((interval) => (
                  <div key={interval} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shadow-inner mb-2">
                      <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        {timerState.time[interval].toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {interval}
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
