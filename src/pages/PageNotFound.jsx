import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 flex items-center justify-center px-6 overflow-hidden">
      
      {/* 🔮 MULTI-LAYERED GRADIENT BACKGROUND WITH FLOATING BLUBS */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-purple-900 to-rose-950/60 z-0"></div>
      
      {/* Animated Blur Orbs */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] border-2 border-rose-400 bg-blue-600/10 rounded-full blur-[130px] animate-pulse pointer-events-none duration-[8s]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] border-2 border-rose-400 bg-rose-500/10 rounded-full blur-[130px] animate-pulse pointer-events-none duration-[6s]"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-rose-400 bg-purple-600/10 rounded-full blur-[80px] animate-bounce pointer-events-none duration-[10s]"></div>

      {/* Main Content Card Wrapper */}
      <div className="relative z-10 text-center max-w-xl mx-auto space-y-8 backdrop-blur-sm bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 p-8 sm:p-12 rounded-3xl border-2 border-rose-400 mt-16 shadow-2xl">
        
        {/* Floating Icon Indicator */}
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-rose-500/10 border-2 border-rose-400 animate-bounce duration-[4s]">
          <FaCompass className="w-8 h-8 text-amber-400" />
        </div>

        {/* Huge 404 Typography with Linear Gradient */}
        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-mono font-black tracking-tighter text-rose-400 bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-950 drop-shadow">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-200 tracking-wide">
            Oops! The page you're looking for has vanished into thin air.
          </h2>
        </div>

        {/* Decorative Divider */}
        <div className="h-[1px] w-28 bg-amber-400 mx-auto"></div>

        {/* Description Context */}
        <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm mx-auto">
          The structural elixir path or catalog shelf you are trying to access has been vaporized or moved deeper into our high-security vault.
        </p>

        {/* Dynamic CTA Action Triggers */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Main Home Button */}
          <Link 
            to="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950 text-rose-400 font-bold text-xs uppercase tracking-widest hover:opacity-95 hover:text-white shadow-xl transition-all active:scale-[0.98] cursor-pointer"
          >
            <FaHome className="text-xs" />
            Back To Home
          </Link>

          {/* Catalog Explore Button */}
          <Link 
            to="/shop" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-transparent border-2 border-rose-400 text-rose-400 hover:text-amber-400 hover:border-amber-400 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Explore Scents
          </Link>

        </div>

      </div>
    </div>
  );
};

export default PageNotFound;