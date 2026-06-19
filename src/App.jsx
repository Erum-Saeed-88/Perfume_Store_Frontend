import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers Import (Global Context Setup)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Global Layout Components Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// All Core Pages Import
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import CheckoutForm from './pages/CheckoutForm';
import AdminDashboard from './pages/AdminDashboard';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const [siteLoading, setSiteLoading] = useState(true);

  useEffect(() => {
    // ⏳ Website open hote hi 1.8 seconds ka buffer lock chalega
    const timer = setTimeout(() => {
      setSiteLoading(false);
    }, 1800); 

    return () => clearTimeout(timer);
  }, []);

  // =========================================================================
  // 👑 GLOBAL LUXURY PRE-LOADER CONTAINER
  // =========================================================================
  if (siteLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-stone-950 via-purple-950 to-stone-950 text-stone-100 z-[9999] fixed inset-0">
        <div className="relative flex items-center justify-center">
          {/* Sleek Outer Ring */}
          <div className="w-12 h-12 rounded-full border-[3px] border-t-rose-400 border-r-amber-400/20 border-b-purple-500/10 border-l-transparent animate-spin"></div>
          
          {/* Counter-Rotating Inner Ring */}
          <div className="absolute w-8 h-8 rounded-full border-[3px] border-t-transparent border-r-purple-400 border-b-transparent border-l-teal-400 animate-spin [animation-duration:1.1s] reverse"></div>
          
          {/* Glowing Luxury Dot */}
          <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 animate-pulse"></div>
        </div>
        
        {/* Brand Typography */}
        <h1 className="mt-6 text-sm font-serif tracking-[0.4em] text-stone-200 uppercase animate-pulse">
          THE PERFUME STORE
        </h1>
        <p className="mt-2 text-[9px] font-light uppercase tracking-[0.2em] text-rose-400/60">
          Entering the House of Fragrances...
        </p>
      </div>
    );
  }

  // =========================================================================
  // 🛍️ MAIN APPLICATION LAYER (Loader ke baad active hogi)
  // =========================================================================
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Main App Container with Dark Luxury Aesthetic Background */}
          <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-200 antialiased overflow-x-hidden">
            
            {/* 1. Global Navigation Header (Transparent-to-Gradient Animated) */}
            <Navbar />

            {/* 2. Main Routing Viewport Context */}
            <main className="flex-grow w-full z-10 relative">
              <Routes>
                {/* Public Luxury Core Store Fronts */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* E-Commerce User Utility Portals */}
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutForm />} />

                {/* Authentication Gateways */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Secure Management Panel Desk */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Fallback Catch-All Page Not Found Endpoint (404) */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>

            {/* 3. Global Luxury Commercial Branding Footer */}
            <Footer />

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;