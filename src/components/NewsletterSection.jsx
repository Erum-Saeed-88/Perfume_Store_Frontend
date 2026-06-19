import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelopeOpenText, FaCheckCircle } from 'react-icons/fa';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation Check
    if (!email) {
      setError('Please provide an elite email coordinate.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('This email vector seems malformed. Verify again.');
      return;
    }

    // 📡 Backend Submission Simulation
    console.log("Subscribed Email: ", email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-rose-950/60 py-20 px-4 sm:px-8 border-b border-purple-300 lg:px-12 relative w-full box-border overflow-hidden">
      
      {/* Background Decorative Ambient Orbs for Premium Visual Depth */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto w-full text-center relative z-10">
        
        {/* Animated Premium Header */}
        <div className="flex justify-center mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 bg-clip-text text-transparent text-3xl animate-pulse">
            <FaEnvelopeOpenText />
          </span>
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] p-2 rounded-xl shadow-md animate-pulse font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300">
          The Sovereign Circle
        </span>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-400 tracking-wide mt-1">
          Unlock Exclusive Chronicles
        </h2>
        
        <p className="text-xs text-stone-300 font-light max-w-md mx-auto mt-3 leading-relaxed">
          Subscribe to receive private access into the luxury vault—including rare restocks, secret olfactory profile drops, and elite priority privileges.
        </p>

        {/* ⚡ Subscription Controller Matrix */}
        <div className="mt-8 max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubscribe} className="w-full">
              {/* Input Group Structure */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch w-full">
                
                {/* Email Box Input */}
                <input
                  type="email"
                  placeholder="Enter your elite email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(error) setError('');
                  }}
                  className="bg-purple-300 text-stone-200 placeholder-stone-600 text-xs font-medium py-3.5 px-5 rounded-xl flex-grow focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/20 transition-all w-full shadow-inner"
                />

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-90 active:scale-98 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/40 min-w-[140px]"
                >
                  <FaPaperPlane className="text-[10px]" />
                  Subscribe
                </button>
              </div>

              {/* 🚨 Error Matrix Slot */}
              {error && (
                <p className="text-left sm:text-center text-[11px] font-medium text-rose-400 mt-2.5 tracking-wide pl-2 sm:pl-0">
                  ⚠️ {error}
                </p>
              )}
            </form>
          ) : (
            /* 🎉 Success Slate Module (Triggers smoothly after successful subscribe) */
            <div className="bg-stone-950/70 border border-emerald-500/30 p-6 rounded-2xl animate-fade-in shadow-lg shadow-emerald-950/20">
              <div className="flex items-center justify-center gap-3 text-emerald-400">
                <FaCheckCircle className="text-lg flex-shrink-0" />
                <span className="text-sm font-medium tracking-wide font-sans text-stone-200">
                  Welcome to the Inner Sanctum. Check your transmission box shortly.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Premium Under-text Disclaimer */}
        <p className="text-[10px] text-stone-500 font-light mt-4 tracking-wider">
          We respect your spatial privacy. Zero spam. Safe unsubscription mechanics anytime.
        </p>

      </div>
    </section>
  );
};

export default NewsletterSection;