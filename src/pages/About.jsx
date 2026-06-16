import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaGlobeAmericas, FaGem, FaArrowRight, FaCompass } from 'react-icons/fa';
import AboutHero from '../components/AboutHero';

const About = () => {

  const backgroundImage = "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920";

  return (
    <>
    <AboutHero />
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 text-stone-100 min-h-screen pt-28 pb-16 overflow-hidden relative">
      
      {/* 🔮 BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        

        {/* SECTION 2: THE STORY (SPLIT GRID WITH IMAGE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text Story */}
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-2xl font-serif font-bold text-rose-400 tracking-wide">
              The Art of Liquid Emotion
            </h3>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              Every bottle of Scentsation tells a private story. We believe that a fragrance is not merely an accessory, but an invisible extension of one's identity and sovereign aura. 
            </p>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Our master perfumers travel across oceans—from the dense agarwood forests of Assam to the delicate rose valleys of Grasse—to responsibly source ingredients that meet the gold standard of longevity and sillage.
            </p>
          </div>
          
          {/* Right Side: Luxury Image with Gradient Frame */}
          <div className="relative order-1 md:order-2 flex justify-center">
            <div className="absolute inset-0 max-w-[400px] h-[300px] sm:h-[350px] mx-auto rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 opacity-20 blur-lg scale-105"></div>
            <div className="relative w-full max-w-[400px] h-[300px] sm:h-[350px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
              <img 
                src="https://faunwalk.com/cdn/shop/files/100ml1_60e37f97-e439-4020-a7bf-1ff5c1f7b948.jpg?v=1776842293&width=1946" 
                alt="Perfume formulation craft" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: CORE PILLARS (3-COLUMN INFOGRAPHICS) */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 bg-purple-300 p-10 rounded-2xl">
          
          {/* Pillar 1 */}
          <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
              <FaGem />
            </div>
            <h4 className="text-base font-serif font-medium text-stone-200">Ultra-Premium Ingredients</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Using the highest concentration of oil blends (Parfum & Intense tiers) to guarantee unprecedented performance that lingers for hours.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
              <FaAward />
            </div>
            <h4 className="text-base font-serif font-medium text-stone-200">Artisanal Curation</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Our unique selection of Body Sprays, Eau De Perfumes, and Attars are hand-poured and strictly matured under controlled cellars.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl">
              <FaGlobeAmericas />
            </div>
            <h4 className="text-base font-serif font-medium text-stone-200">Sustainably Sourced</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              We partner globally with ethical botanical reserves, preserving biodiversity while extracting the purest essences safely.
            </p>
          </div>

        </div>

        {/* SECTION 4: INSPIRATIONAL BANNER (SPLIT GRID WITH IMAGE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-6">
          {/* Left Side: Product Display Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 max-w-[400px] h-[300px] sm:h-[350px] mx-auto rounded-2xl bg-gradient-to-r from-rose-400 via-purple-600 to-blue-600 opacity-20 blur-lg scale-105"></div>
            <div className="relative w-full max-w-[400px] h-[300px] sm:h-[350px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
              <img 
                src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/37/9810883/2.jpg?5502" 
                alt="Luxury perfume bottles raw aesthetic" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Side: Call to action context */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-rose-400 tracking-wide">
              Ready to Discover Your Signature?
            </h3>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              Whether you are looking for the fresh citrus rush of a morning Body Spray, the sovereign statement of a midnight Eau De Perfume, or the traditional royalty of a highly-concentrated oil Attar, your match is already waiting inside our vault.
            </p>
            <div className="pt-2">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-95 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
              >
                Explore The Collection
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default About;