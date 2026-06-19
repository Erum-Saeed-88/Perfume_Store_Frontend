import React from 'react';
import Hero from '../components/Hero';
import PremiumCollection from '../components/PremiumCollection'; // Import split section
import StatsSection from '../components/StatsSection';
import TeamSection from '../components/TeamSection';
import TickerSection from '../components/TickerSection';
import AboutStory from '../components/AboutStory';
import FaqSection from '../components/FaqSection';
import NewsletterSection from '../components/NewsletterSection';

const Home = () => {
  return (
    <div className="bg-stone-950 overflow-hidden min-h-screen">
      {/* 1. Hero Dynamic Carousel Slider Section */}
      <Hero />

      {/* 2. Premium Infinite Ticker Section */}
      <TickerSection />

      {/* 3. About Section with short story */}
      <AboutStory />

      {/* 4. Premium Grid Carousel Section with Integrated View Modals */}
      <PremiumCollection />

        {/* 5. Dynamic Stats & Milestones Section with Animated Counters */}
      <StatsSection />

        {/* 6. Future Sections: Testimonials, Newsletter, etc. */}
        <TeamSection />

        {/*7. Fraquent Ask Questions section */}
        <FaqSection />
        
        {/* 8. Newsletter Section */}
        <NewsletterSection />
    </div>
  );
};

export default Home;