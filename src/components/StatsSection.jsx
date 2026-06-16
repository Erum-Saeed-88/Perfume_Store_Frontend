import React, { useEffect, useState, useRef } from 'react';

const StatsSection = () => {
  const [stats, setStats] = useState({ clients: 0, fragrances: 0, boutiques: 0, rating: 0 });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        hasAnimated.current = true;
        animateCounters();
      }
    };

    const animateCounters = () => {
      const targets = { clients: 15000, fragrances: 120, boutiques: 8, rating: 5 };
      const duration = 2000; // 2 seconds animation time
      const steps = 50;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setStats({
          clients: Math.floor((targets.clients / steps) * currentStep),
          fragrances: Math.floor((targets.fragrances / steps) * currentStep),
          boutiques: Math.floor((targets.boutiques / steps) * currentStep),
          rating: parseFloat(((targets.rating / steps) * currentStep).toFixed(1))
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targets); // Final precise numbers block
        }
      }, stepTime);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case it's already in viewport on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-purple-300 py-10 px-6 overflow-hidden relative z-10"
    >
      <div className="relative my-20 py-20 px-4 overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-rose-900 shadow-2xl rounded-3xl">
      {/* 🔮 FLOATING BULBS/BUBBLES EFFECT */}
      <div className="absolute w-24 h-24 bg-white/10 rounded-full blur-md animate-bounce top-4 left-10 pointer-events-none duration-[6s]"></div>
      <div className="absolute w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse bottom-6 right-1/4 pointer-events-none duration-[4s]"></div>
      <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full blur-sm top-1/2 right-12 animate-ping pointer-events-none duration-[8s]"></div>
      <div className="absolute w-20 h-20 bg-rose-400/10 rounded-full blur-md top-10 left-1/3 animate-pulse pointer-events-none duration-[5s]"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        
        {/* Stat 1 */}
        <div className="space-y-2 backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
          <h3 className="text-xl md:text-2xl font-mono font-black text-purple-300">
            {stats.clients.toLocaleString()}+
          </h3>
          <p className="text-xs uppercase tracking-widest font-bold text-rose-400">Global Connoisseurs</p>
        </div>

        {/* Stat 2 */}
        <div className="space-y-2 backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
          <h3 className="text-xl md:text-2xl font-mono font-black text-purple-300">
            {stats.fragrances}+
          </h3>
          <p className="text-xs uppercase tracking-widest font-bold text-rose-400">Artisanal Formulas</p>
        </div>

        {/* Stat 3 */}
        <div className="space-y-2 backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
          <h3 className="text-xl md:text-2xl font-mono font-black text-purple-300">
            {stats.boutiques}
          </h3>
          <p className="text-xs uppercase tracking-widest font-bold text-rose-400">Luxury Vaults</p>
        </div>

        {/* Stat 4 */}
        <div className="space-y-2 backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
          <h3 className="text-xl md:text-2xl font-mono font-black text-amber-300">
            {stats.rating}/5
          </h3>
          <p className="text-xs uppercase tracking-widest font-bold text-amber-200">Sillage Reviews</p>
        </div>

      </div>
      </div>
    </section>
  );
};

export default StatsSection;