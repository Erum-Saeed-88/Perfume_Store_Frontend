import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';

const ShopHero = () => {
  // 🎯 TIP: Aap backend ya Cloudinary se koi bhi premium perfume banner image ka URL yahan laga sakte hain
  const backgroundImage = "https://i.makeagif.com/media/5-16-2015/mh8Gw3.gif";

  return (
    <section className="relative w-full h-[65vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-stone-950">
      
      {/* 🖼️ Background Perfume Image Grid */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backgroundImage} 
          alt="Scentsation Premium Olfactory Banner" 
          className="w-full h-full object-cover object-center scale-105 animate-fade-in duration-1000"
        />
        
        {/* 🎭 THE LUXURY MASK: Dark radial & linear gradient to make text 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-black/50"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/90"></div>
      </div>

      {/* 📝 Content Matrix Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Upper Accent */}
        <div className="mb-3 flex justify-center mt-40 xs:mt-65">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300">
            Our Liquid Chronicles
          </span>
        </div>

        {/* Main Luxurious Heading */}
        <h1 className="text-xl sm:text-4xl md:text-3xl lg:text-4xl font-serif font-bold text-olive-400 tracking-wide leading-tight">
          Architects of <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">
            Invisible Luxury
          </span>
        </h1>

        {/* Elegant Short Bio / Subtext */}
        <p className="mt-4 text-xs md:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
          At SCENTSATION, we don't just compile notes; we capture fleeting memories, raw emotions, and sovereign power dynamics inside liquid glass vaults. Crafted for true connoisseurs.
        </p>

        {/* Action Button Matrix */}
        <div className="mt-8 flex justify-center mb-15 sm:mb-25">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-90 active:scale-95 text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-8 rounded-xl transition-all shadow-xl shadow-purple-950/50 group"
          >
            <FaCompass className="text-[11px] text-stone-200 group-hover:rotate-45 transition-transform" />
            Explore The Vault
          </Link>
        </div>

      </div>

      {/* Elegant Bottom Border Divider to blend with the next section */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
    </section>
  );
};

export default ShopHero;