import React from "react";

const AboutStory = () => {
  return (
    <div className="w-full bg-purple-300 py-20">
      <h2 className="text-4xl font-bold text-center transition-opacity text-transparent bg-clip-text bg-gradient-to-b from-blue-600 via-purple-600 to-rose-300 tracking-wide mb-8">
        Our Story
      </h2>
      <p className="text-center text-stone-500 text-sm max-w-2xl mx-auto mb-12">
        At Scentsation, we believe that a fragrance is not just a scent, but an
        expression of one's soul. Our master perfumers blend the finest
        ingredients from around the world to create unique and memorable scents.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mx-auto px-8 max-w-6xl px-4 py-12 bg-transparent">
        {/* Left Side: Text Story */}
        <div className="space-y-6 order-2 md:order-1">
          <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-rose-400 tracking-wide">
            The Art of Liquid Emotion
          </h3>
          <p className="text-olive-700 text-sm font-light leading-relaxed">
            Every bottle of Scentsation tells a private story. We believe that a
            fragrance is not merely an accessory, but an invisible extension of
            one's identity and sovereign aura. Our master perfumers travel
            across oceans—from the dense agarwood forests of Assam to the
            delicate rose valleys of Grasse—to responsibly source ingredients
            that meet the gold standard of longevity and sillage. Each scent is
            meticulously crafted to evoke a specific emotion or memory, whether
            it's the invigorating rush of citrus on a summer morning or the warm
            embrace of amber on a winter night. We are committed to
            sustainability and ethical practices, ensuring that our ingredients
            are harvested with respect for nature and the communities that
            cultivate them. Our packaging is designed to be as luxurious as the
            scents inside, using recycled materials and innovative designs to
            minimize our environmental footprint.
          </p>
        </div>

        {/* Right Side: Luxury Image with Gradient Frame */}
        <div className="relative order-1 md:order-2 flex justify-center">
          <div className="absolute inset-0 max-w-[400px] h-[300px] sm:h-[350px] mx-auto rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 opacity-20 blur-lg scale-105"></div>
          <div className="relative w-full max-w-[400px] h-[300px] sm:h-[350px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
            <img
              src="https://surrati.com.pk/cdn/shop/files/Snapinsta.app_421855323_18404141623051943_7383043393513738475_n_1080.jpg?v=1742109812&width=375"
              alt="Perfume formulation craft"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
