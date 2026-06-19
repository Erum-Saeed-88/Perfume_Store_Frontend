import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaQuoteLeft } from 'react-icons/fa';

const FaqSection = () => {
  // 🗂️ Active Accordion index pointer state
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Are your fragrances 100% authentic and original?",
      answer: "Absolutely. Every bottle in our Sovereign Vault is sourced directly from original design houses in France and certified distributors. We maintain a zero-tolerance policy for replicas or testers sold as retail bottles."
    },
    {
      question: "How long does the premium sillage and longevity last?",
      answer: "Our curated Eau De Parfums and Attars feature high oil concentrations, offering an elite sillage that projects beautifully for 3 to 5 hours, with an overall skin and fabric longevity stretching past 12+ hours."
    },
    {
      question: "Do you offer safe, secure nationwide shipping across Pakistan?",
      answer: "Yes, we dispatch our luxury items via tracked premium couriers. All orders are packed in heavy-duty, bubble-wrapped custom hardboxes to eliminate any risk of leakage or breakage during transit."
    },
    {
      question: "Can I return a perfume if I do not like the scent profile?",
      answer: "Due to the hygienic nature of luxury extraits, we cannot accept returns once the outer cellophane security seal is broken. However, we offer sample decants with select purchases so you can test before unboxing."
    },
    {
      question: "How should I store my luxury perfume to preserve its profile?",
      answer: "To protect the delicate top notes, store your bottles in a cool, dark place away from direct sunlight, humidity, and rapid temperature fluctuations (avoid bathroom shelves or car gloveboxes)."
    }
  ];

  const toggleFaqHandler = (index) => {
    // Agar pehle se khula hua hai toh close kardo, warna naya kholo
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-purple-300 py-20 px-4 sm:px-8 lg:px-12 border-t border-stone-900/60 relative w-full box-border">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading Matrix */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-center transition-opacity text-transparent bg-clip-text bg-gradient-to-b from-blue-600 via-purple-600 to-rose-300 tracking-wide mb-3">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-stone-600 font-light max-w-md mx-auto leading-relaxed">
            Everything you need to navigate the exquisite world of premium artisanal extraits.
          </p>
        </div>

        {/* 🛍️ FAQ Accordion Stack */}
        <div className="space-y-4 w-full">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-purple-500/50 shadow-lg shadow-purple-950/40' 
                    : 'bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-stone-800/60 hover:border-stone-700/60'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaqHandler(index)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors group focus:outline-none"
                >
                  <div className="flex items-center gap-4 pr-4">
                    {/* Amber / Gold Colored Question Indicator */}
                    <FaQuestionCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? 'text-rose-400' : 'text-rose-400 group-hover:text-purple-400'}`} />
                    <span className={`text-sm font-medium tracking-wide font-sans transition-colors ${isOpen ? 'text-white' : 'text-purple-300 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron Arrow */}
                  <FaChevronDown className={`w-3 h-3 text-amber-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                {/* Smooth Expandable Answer Body */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100 border-t border-stone-800/40' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 bg-stone-950/40 text-xs font-light text-stone-300 leading-relaxed flex gap-3">
                    <FaQuoteLeft className="text-amber-400 text-lg flex-shrink-0 mt-0.5" />
                    <p>{faq.answer}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;