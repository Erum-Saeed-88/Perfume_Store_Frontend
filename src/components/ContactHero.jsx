import React from 'react';
import { FaHeadset } from 'react-icons/fa';

const ContactHero = () => {
  // 🎯 TIP: Aap apni marzi ki koi bhi high-quality dark/luxury aesthetic contact background image yahan laga sakte hain
  const backgroundImage = "https://i.pinimg.com/originals/a0/1c/e0/a01ce0478c410ebf5c883c4f2942cfb1.gif";

  return (
    <section className="relative w-full h-[60vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-stone-950">
      
      {/* 🖼️ Background Perfume Mist/Aesthetic Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backgroundImage} 
          alt="Scentsation Luxury Concierge Banner" 
          className="w-full h-full object-cover object-center scale-105 animate-fade-in duration-1000"
        />
        
        {/* 🎭 THE LUXURY MASK: Dark radial & linear gradient to make text 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-black/40"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/50 to-stone-950/90"></div>
      </div>

      {/* 📝 Content Matrix Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Upper Accent */}
        <div className="mb-3 flex justify-center mt-25">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300">
            Olfactory Concierge
          </span>
        </div>

        {/* Main Luxurious Heading */}
        <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide leading-tight">
          Connect With Our <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">
            Sovereign House
          </span>
        </h1>

        {/* Elegant Short Subtext */}
        <p className="mt-4 text-xs md:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
          Whether you seek a bespoke scent profile curation, order intelligence, or elite partnership inquiries—our private concierge vault is at your complete disposal.
        </p>

        {/* Subtle Decorative Badge instead of action button (Ideal for contact headers) */}
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 bg-purple-300 text-stone-600 text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl">
            <FaHeadset className="text-purple-600 animate-pulse" />
            Response Matrix: Within 24 Hours
          </span>
        </div>

      </div>

      {/* Elegant Bottom Border Divider to blend with your Contact Form section */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
    </section>
  );
};

export default ContactHero;