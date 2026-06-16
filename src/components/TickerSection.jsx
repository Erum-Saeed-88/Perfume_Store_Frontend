import React from 'react';
import { FaGem, FaAward, FaCrown, FaCheckCircle } from 'react-icons/fa';

const TickerSection = () => {
  const tickerItems = [
    { text: "100% Authentic Fragrances", icon: <FaCheckCircle /> },
    { text: "Imported Directly From France", icon: <FaCrown /> },
    { text: "Premium Luxury Sillage", icon: <FaGem /> },
    { text: "Long-Lasting Masterpieces", icon: <FaAward /> },
    { text: "Curated Sovereign Vault", icon: <FaCrown /> },
  ];

  // Array ko duplicate kiya hai taake smooth seamless loop chale
  const doubledItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-gradient-to-br from-blue-900 via-purple-900 to-rose-950/60 border-y border-stone-800/80 py-5 overflow-hidden relative flex items-center shadow-inner">
      
      {/* Side Faders for Luxury Look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none"></div>

      {/* Moving Track */}
      <div className="flex whitespace-nowrap animate-infinite-scroll hover:[animation-play-state:paused] cursor-pointer">
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center mx-10 gap-3">
            
            {/* 🎯 FIXED: Solid Gold/Amber color for 100% visibility guarantee */}
            <span className="text-amber-400 text-sm flex items-center justify-center animate-pulse">
              {item.icon}
            </span>

            {/* Premium Typography */}
            <span className="text-stone-300 font-sans text-xs uppercase tracking-[0.2em] font-medium hover:text-white transition-colors">
              {item.text}
            </span>

            {/* Dot Separator */}
            <span className="text-stone-600 font-light text-xs ml-4">&bull;</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default TickerSection;