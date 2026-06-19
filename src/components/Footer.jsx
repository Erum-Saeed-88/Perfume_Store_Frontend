import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaRegCheckCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 text-stone-300 shadow-md py-3 px-4 sm:px-6 lg:px-4 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif tracking-widest shadow-md p-2 hover:text-amber-400 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold">
            SCENTSATION
          </h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Elevating your presence through premium, internationally sourced luxury fragrances.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><FaInstagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-rose-400 transition-colors"><FaTwitter className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-4">Explore</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><Link to="/" className="hover:text-amber-400 hover:underline font-semibold text-purple-300 transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-400 hover:underline text-purple-300 font-semibold transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 hover:underline text-purple-300 font-semibold transition-colors">Our Story</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-4">Collections</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><Link to="/shop?category=Men" className="hover:text-amber-400 hover:underline text-purple-300 font-semibold transition-colors">Men's Fragrances</Link></li>
            <li><Link to="/shop?category=Women" className="hover:text-amber-400 hover:underline text-purple-300 font-semibold transition-colors">Women's Perfumes</Link></li>
            <li><Link to="/wishlist" className="hover:text-amber-400 hover:underline font-semibold text-purple-300 transition-colors">Your Wishlist</Link></li>
          </ul>
        </div>

        {/* Secure Checkout Badge */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-rose-400 mb-4">Guaranteed</h4>
          <div className="flex items-center gap-2 bg-transparent shadow-md p-3 border border-stone-800">
            <FaRegCheckCircle className="w-5 h-5 text-amber-400" />
            <span className="text-[11px] font-light text-purple-300">100% Secure Checkout via Stripe Payments.</span>
          </div>
        </div>
      </div>

      <div className="border-t border-rose-400 py-6 text-center text-xs text-rose-400 font-light">
        &copy; {new Date().getFullYear()} Scentsation Premium E-Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;