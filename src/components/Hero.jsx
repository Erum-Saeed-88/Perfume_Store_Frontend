import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides data array mapping to premium perfume aesthetics
  const slides = [
    {
      id: 1,
      tagline: "Midnight Luxury Collection",
      title: "Scentsation Oud Intense",
      desc: "Experience the deep, captivating essence of premium Agarwood blended with midnight patchouli and sweet rose-gold vanilla notes.",
      btnText: "EXPLORE OUD",
      link: "/shop",
      img: "https://res.cloudinary.com/dasmmiwtb/image/upload/v1781622184/Oud_set_xujfpq.webp"
    },
    {
      id: 2,
      tagline: "Elegance For Her",
      title: "Rose Gold & Orchid Dior",
      desc: "A soft yet dominant symphony of royal orchids, crushed pink berries, and a premium metallic rose-gold aura designed for the modern queen.",
      btnText: "SHOP WOMEN",
      link: "/shop?category=Women",
      img: "https://i.pinimg.com/originals/ea/55/0e/ea550ebbdcf012e6e8e3146072128aa4.gif"
    },
    {
      id: 3,
      tagline: "The Sovereign Identity",
      title: "Ocean Blue Suavage Dior",
      desc: "Fresh maritime sea salt fused with sharp Italian bergamot, dark vetiver, and an unforgettable magnetic wood trail.",
      btnText: "Men SCENTS",
      link: "/shop?category=Men",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/e50d4f212258703.67351c760ad16.gif"
    }
  ];

  // Autoplay Slider mechanism (5 seconds per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      
      {/* 🔮 BACKGROUND FLOATING GRADIENT BULBS (Blobs) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-bounce pointer-events-none duration-[8000ms]"></div>
      <div className="absolute top-1/2 right-10 w-60 h-60 bg-rose-400/15 rounded-full blur-[70px] animate-pulse pointer-events-none duration-[4000ms]"></div>

      {/* Main Content Layout Wrapper */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN: ANIMATED TEXT CONTEXT */}
          <div className="text-left space-y-6 order-2 md:order-1">
            {/* Tagline Animation */}
            <span 
              key={`tag-${currentSlide}`} 
              className="inline-block text-xs md:text-sm font-semibold tracking-widest text-rose-300 uppercase transition-all duration-700 transform translate-y-0 animate-[fadeInDown_0.5s_ease-out]"
            >
              {slides[currentSlide].tagline}
            </span>
            
            {/* Title Gradient Headliner */}
            <h1 
              key={`title-${currentSlide}`}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 tracking-wide leading-tight animate-[fadeInLeft_0.6s_ease-out]"
            >
              {slides[currentSlide].title}
            </h1>
            
            {/* Description Text */}
            <p 
              key={`desc-${currentSlide}`}
              className="text-stone-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl animate-[fadeInLeft_0.8s_ease-out]"
            >
              {slides[currentSlide].desc}
            </p>
            
            {/* Dynamic Interactive Call-To-Action Button */}
            <div key={`btn-${currentSlide}`} className="pt-4 animate-[fadeInUp_1s_ease-out]">
              <Link 
                to={slides[currentSlide].link}
                className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-95 shadow-lg shadow-purple-900/30 group transition-all duration-300 hover:scale-[1.02]"
              >
                {slides[currentSlide].btnText}
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE IMAGES CONTEXT */}
          <div className="relative flex justify-center order-1 md:order-2">
            {/* Decorative Background Frame Gradient Border */}
            <div className="absolute inset-0 max-w-[340px] sm:max-w-[380px] h-[420px] sm:h-[480px] mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-rose-400 opacity-30 blur-md -rotate-3 scale-105"></div>
            
            {/* Real Sliding Imagery Rendering Card */}
            <div 
              key={`img-${currentSlide}`}
              className="relative w-full max-w-[340px] sm:max-w-[380px] h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 animate-[fadeInRight_0.7s_ease-out]"
            >
              <img 
                src={slides[currentSlide].img} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[4000ms]"
              />
              {/* Subtle Elegant Bottom ShadowOverlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>

        {/* BOTTOM DOT INDICATORS SYSTEM */}
        <div className="flex justify-center md:justify-start space-x-3 mt-12 md:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                currentSlide === index 
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-rose-400' 
                  : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;