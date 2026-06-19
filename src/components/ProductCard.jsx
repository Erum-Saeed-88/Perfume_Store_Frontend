import React, { useContext, useState } from 'react';
import { FaShoppingBag, FaHeart, FaEye, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // 🎯 FIXED: Navigation routing handling
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product, setSelectedProduct }) => {
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // 🎯 Router redirection instance

  // 🎯 RESPONSIVE POPUP STATES
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false); // 🎯 Tracks visual validation error state

  const isOutOfStock = product.countInStock === 0;

  // SAFETY CHECK: Extract brand variations cleanly
  const productBrand = product.brand || product.brandName || product.Brand || "";

  // Helper to trigger popup matrix
  const triggerNotification = (message, isError = false) => {
    setPopupMessage(message);
    setIsErrorPopup(isError);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500); // 2.5 seconds baad auto-hide
  };

  const addToCartHandler = () => {
    if (isOutOfStock) return;
    
    // 🔐 AUTH REGISTRATION GATE GUARD
    if (!user) {
      triggerNotification("Please register an account to start shopping! 🔐", true);
      
      // 📦 Temporary Storage Pipeline: Save product metadata to process after login
      localStorage.setItem('pendingCartItem', JSON.stringify(product));

      // 1.5 seconds delay taake user validation message safely parhle
      setTimeout(() => {
        navigate('/register'); 
      }, 1500);
      return;
    }

    // Standard logic if user is authenticated
    const itemExists = cartItems.find((x) => x._id === product._id);
    if (itemExists) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }

    // 🎯 TRIGGER: Cart item added notification
    triggerNotification(`Added ${product.name} to luxury cart!`);
  };

  const toggleWishlistHandler = () => {
    // 🔐 WISHLIST AUTH CONTROL
    if (!user) {
      triggerNotification("Please register to build your premium wishlist! 🔐", true);
      setTimeout(() => {
        navigate('/register');
      }, 1500);
      return;
    }

    const itemExists = wishlistItems.find(x => x._id === product._id);
    if (itemExists) {
      setWishlistItems(wishlistItems.filter((x) => x._id !== product._id));
      triggerNotification(`Removed from wishlist 🤍`);
    } else {
      setWishlistItems([...wishlistItems, product]);
      triggerNotification(`Added ${product.name} to wishlist!`);
    }
  };

  return (
    <div className="bg-purple-300 border-2 border-rose-400 rounded-2xl overflow-hidden group shadow-lg hover:shadow-purple-950/20 transition-all duration-300 flex flex-col h-full relative">
      
      {/* =========================================================================
          🎯 FLOATING NOTIFICATION POPUP: Mobile optimized overlay portal
         ========================================================================= */}
      {showPopup && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto min-w-[280px] border px-4 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2.5 animate-fade-in-up backdrop-blur-md bg-opacity-95 transition-all duration-300 ${
          isErrorPopup ? 'bg-red-950 text-red-200 border-red-800' : 'bg-stone-950 text-stone-100 border-stone-800'
        }`}>
          {isErrorPopup ? <FaExclamationCircle className="text-red-400 text-sm shrink-0" /> : <FaCheckCircle className="text-emerald-400 text-sm shrink-0" />}
          <span className="text-[11px] font-medium tracking-wide text-center line-clamp-1">
            {popupMessage}
          </span>
        </div>
      )}

      {/* Cloudinary Image Frame Container */}
      <div 
        onClick={() => setSelectedProduct(product)} 
        className="relative pt-[110%] bg-stone-200 m-5 rounded-lg shadow-md overflow-hidden cursor-pointer group/image"
      >
        <img 
          src={product.image || null} 
          alt={product.name} 
          className={`absolute inset-0 w-full h-full object-cover transform group-hover/image:scale-105 transition-transform duration-500 ${isOutOfStock ? 'blur-[2px] opacity-40' : ''}`}
        />

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center z-10">
          <span className="bg-purple-950/80 text-rose-400 p-3 rounded-full border border-rose-400/30 backdrop-blur-sm transform translate-y-2 group-hover/image:translate-y-0 transition-all">
            <FaEye className="w-4 h-4" />
          </span>
        </div>

        {/* Dynamic Out of Stock / Sold Badge Grid */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <span className="bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-xs tracking-widest px-4 py-2 rounded-lg shadow-lg uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Top-Right Quick Action Badges */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlistHandler();
          }}
          className="absolute top-4 right-4 hover:text-rose-400 cursor-pointer p-2.5 rounded-xl text-stone-400 backdrop-blur-md transition-colors z-30"
        >
          <FaHeart className={wishlistItems.find(x => x._id === product._id) ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      {/* Details Meta Block */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-transparent">
        <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
          <span className="text-[10px] uppercase font-bold tracking-widest text-transparent mb-3 bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">
            {product.gender} &bull; {product.category}
          </span>
          
          {/* VISUAL CONFIRMATION: Brand Check */}
          {productBrand && (
            <span className="block text-[9px] uppercase font-bold tracking-wider text-purple-950 italic">
              Brand: <span className='text-rose-300 bg-purple-950/40 p-1 rounded-md'> {productBrand}</span>
            </span>
          )}

          <h3 className="text-rose-400 font-serif font-bold text-base mt-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-stone-400 font-light line-clamp-2 mt-1.5 leading-relaxed">
            {product.description || "Premium authentic fragrance imported directly for luxury connoisseurs."}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-rose-400 flex items-center justify-between">
          <span className="text-lg font-bold text-stone-600 font-sans">
            $ {product.price?.toLocaleString()}
          </span>

          {/* 🎯 UNIFIED BUTTON GRID: Always premium layout mapping */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              addToCartHandler();
            }}
            disabled={isOutOfStock}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer tracking-wider text-white transition-all ${
              isOutOfStock 
                ? 'bg-stone-600 cursor-not-allowed opacity-50 border border-stone-700/30' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-rose-400 hover:text-rose-400 hover:opacity-90 shadow-md active:scale-95'
            }`}
          >
            <FaShoppingBag className='animate-pulse text-[16px]' />
            {isOutOfStock ? 'Out of Stock' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;