import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Zareen Ahmed",
      role: "Founder & Creative Visionary",
      image: "https://res.cloudinary.com/dasmmiwtb/image/upload/v1781626169/portrait-beautiful-woman-with-shopping-bags_329181-18722_rkg39q.avif",
      bio: "Over 15 years of standard evaluation experience in olfactory arts. Zareen handles the global sourcing channels and signature brand aura."
    },
    {
      id: 2,
      name: "Hamza Malik",
      role: "Digital Operator & Logistics",
      image: "https://res.cloudinary.com/dasmmiwtb/image/upload/v1781626249/senior-laravel-vuejs-expert-v1_tbxzgd.jpg",
      bio: "Architect behind the automated secure e-commerce deployment. Hamza commands the warehouse dispatch speedways and user flows."
    },

    {
      id: 3,
      name: "Elena Rostova",
      role: "Master Perfumer & Scent Alchemist",
      image: "https://res.cloudinary.com/dasmmiwtb/image/upload/v1781626322/79692-lubna-allahametihad-cargo_cecvcq.webp",
      bio: "Graduated from the Royal fields of Grasse, France. Elena curates the structural heart notes and sillage retention matrix formulas."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 transition-opacity bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 relative">
      {/* Heading block */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h3 className="text-2xl md:text-4xl text-rose-400 font-serif font-bold transition-opacity tracking-wide">
          Meet Our Team
        </h3>
        <p className="text-xs text-stone-400 font-light tracking-widest uppercase">
          Meet the minds distilling excellence into every spray
        </p>
      </div>

      {/* 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="w-full h-[380px] bg-transparent group perspective-1000"
          >
            {/* Card Internal Body Flip Engine */}
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
              
              {/* 🛑 FRONT SIDE: IMAGE & NAME LAYOUT */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-purple-300 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                <div className="h-2/3 w-full bg-purple-300 rounded-xl overflow-hidden p-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover filter rounded-xl grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-center text-center bg-purple-300">
                  <h4 className="font-serif text-md text-rose-400 font-bold">{member.name}</h4>
                  <p className="text-[11px] text-stone-600 uppercase tracking-wider font-light mt-1">{member.role}</p>
                </div>
              </div>

              {/* 🛑 BACK SIDE: DETAILS & SOCIALS */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-purple-300 shadow-lg rounded-2xl p-6 shadow-2xl flex flex-col justify-between rotate-y-180">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-md font-bold text-rose-400">{member.name}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-rose-500 font-bold">{member.role}</span>
                  </div>
                  <p className="text-stone-600 text-xs font-light leading-relaxed pt-2 border-t border-rose-400">
                    {member.bio}
                  </p>
                </div>

                {/* Social icons at bottom of card back */}
                <div className="flex gap-4 border-t border-rose-400 pt-4 text-stone-500">
                  <a href="#linkedin" className="hover:text-blue-400 transition-colors"><FaLinkedin className="w-4 h-4" /></a>
                  <a href="#twitter" className="hover:text-purple-400 transition-colors"><FaTwitter className="w-4 h-4" /></a>
                  <a href="#email" className="hover:text-rose-400 transition-colors"><FaEnvelope className="w-4 h-4" /></a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Global CSS Injectors for Tailwind 3D Transforms */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

export default TeamSection;