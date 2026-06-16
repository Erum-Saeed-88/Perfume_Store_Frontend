import React from 'react';
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