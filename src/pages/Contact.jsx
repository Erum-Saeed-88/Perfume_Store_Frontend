import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import TeamSection from '../components/TeamSection';
import ContactHero from '../components/ContactHero';
import NewsletterSection from '../components/NewsletterSection';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mocking message delivery system
    setTimeout(() => {
      alert(`✨ Thank you ${formState.name}! Your message has been sent to the Scentsation vault. We will contact you shortly.`);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>

    <ContactHero />
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 text-stone-100 min-h-screen pt-28 pb-16 overflow-hidden relative">
      
      {/* 🔮 BACKGROUND DECORATIVE FLOATING BLUBS */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        

        {/* Main Grid Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-purple-300 w-full p-10 rounded-2xl">
          
          {/* LEFT COLUMN: BRAND DETAILS CARD (4 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 border-2 border-rose-400 rounded-2xl p-8 shadow-xl space-y-8">
            <div>
              <h3 className="text-xl font-serif font-semibold text-blue-300 tracking-wide mb-2">
                Scentsation HQ
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Experience luxury perfumery consulting first-hand or reach out through our official digital customer desks.
              </p>
            </div>

            {/* Icons Context Registry */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-rose-400">Address</h4>
                  <p className="text-xs text-stone-400 font-light mt-1 leading-relaxed">
                    Plot 42-C, Luxury Lane, Phase 6, DHA,<br />Karachi, Pakistan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-rose-400">Phone</h4>
                  <p className="text-xs text-stone-400 font-light mt-1">+92 (21) 111-SCENT-00</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-rose-400">Email Vault</h4>
                  <p className="text-xs text-stone-400 font-light mt-1">concierge@scentsation-store.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-rose-400">Operation Hours</h4>
                  <p className="text-xs text-stone-400 font-light mt-1">Monday – Saturday: 11:00 AM – 09:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PREMIUM INTERACTIVE CONTACT FORM (7 Columns) */}
          <div className="lg:col-span-7 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 border-2 border-rose-400 rounded-2xl p-8 shadow-xl">
            <h3 className="text-lg font-serif font-medium text-rose-400 text-center underline tracking-wide mb-6">
              Send Us A Message
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1.5">Full Name</label>
                  <input 
                    type="text" name="name" required value={formState.name} onChange={handleInputChange}
                    className="w-full bg-purple-300 p-3 rounded-xl text-xs text-stone-400 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1.5">Email</label>
                  <input 
                    type="email" name="email" required value={formState.email} onChange={handleInputChange}
                    className="w-full bg-purple-300  p-3 rounded-xl text-xs text-stone-400 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1.5">Subject</label>
                <input 
                    type="text" name="subject" required value={formState.subject} onChange={handleInputChange}
                    className="w-full bg-purple-300 p-3 rounded-xl text-xs text-stone-400 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="Regarding product formulation, longevity, etc."
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1.5">Your Message</label>
                <textarea 
                  name="message" required rows="5" value={formState.message} onChange={handleInputChange}
                  className="w-full bg-purple-300 p-3 rounded-xl text-xs text-stone-400 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                  placeholder="Write your luxury inquiry here..."
                ></textarea>
              </div>

              {/* Dynamic Action Trigger Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl shadow-md border-2 border-rose-400 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 text-rose-400 font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Transmitting Message...'
                  ) : (
                    <>
                      Dispatch Inquiry
                      <FaPaperPlane className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>


      </div>
      <TeamSection />

      <NewsletterSection />
    </div>
    </>
  );
};

export default Contact;