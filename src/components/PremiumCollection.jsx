import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SlickSlider from 'react-slick';
import { FaShoppingBag, FaEye, FaChevronLeft, FaChevronRight, FaHeart, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 🎯 FIXED: Navigation handling
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // 🎯 FIXED: Auth context verification
import ProductModal from './ProductModal';

// Handle both default or structured injection for react-slick
const Slider = SlickSlider.default || SlickSlider;

// Custom Arrow Components for Premium Slider
const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 text-stone-400 hover:text-white p-3 bg-stone-900 border border-stone-800 rounded-xl transition-all hidden md:block">
    <FaChevronRight className="w-3 h-3" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 text-stone-400 hover:text-white p-3 bg-stone-900 border border-stone-800 rounded-xl transition-all hidden md:block">
    <FaChevronLeft className="w-3 h-3" />
  </button>
);

const PremiumCollection = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // 🎯 RESPONSIVE POPUP STATES
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false); // 🎯 Track error look

  const navigate = useNavigate(); // 🎯 Router link navigation trigger

  // 🎯 FETCHING CONTEXT ENGINES
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(CartContext);
  const { user } = useContext(AuthContext); // 🎯 Check user session

  // REAL TIME BREAKPOINT TRACKER
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 540) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getPremiumData = async () => {
      try {
        const { data } = await axios.get('https://perfume-shop-backend-one.vercel.app/api/products');
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 12));
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 12));
        }
      } catch (error) {
        console.error("Error streaming premium shelf carousel data", error);
      } finally {
        setLoading(false);
      }
    };
    getPremiumData();
  }, []);

  // 🎯 TRIGGER POPUP NOTIFICATION HANDLER
  const triggerNotification = (message, isError = false) => {
    setPopupMessage(message);
    setIsErrorPopup(isError);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  const addToCartHandler = (product) => {
    if (product.countInStock === 0) return;

    // 🔐 AUTH GUARD: Agar user logged in nahi hai
    if (!user) {
      triggerNotification("Please register an account to start shopping! 🔐", true);
      
      // 📦 Save this pending product in localStorage so we can add it later
      localStorage.setItem('pendingCartItem', JSON.stringify(product));

      // Redirect to register after 1.5 seconds
      setTimeout(() => {
        navigate('/register'); 
      }, 1500);
      return;
    }

    // Standard core logic if user is authenticated
    const itemExists = cartItems.find((x) => x._id === product._id);
    if (itemExists) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    
    triggerNotification(`Added ${product.name} to luxury cart!`);
  };

  // 🎯 WISHLIST HANDLER FUNCTION INJECTION WITH AUTH CONTROL
  const toggleWishlistHandler = (product) => {
    if (!user) {
      triggerNotification("Please login to create your wishlist vault! 🔐", true);
      setTimeout(() => navigate('/register'), 1500);
      return;
    }

    const itemExists = wishlistItems.find((x) => x._id === product._id);
    if (itemExists) {
      setWishlistItems(wishlistItems.filter((x) => x._id !== product._id));
      triggerNotification(`Removed from wishlist 🤍`);
    } else {
      setWishlistItems([...wishlistItems, product]);
      triggerNotification(`Added ${product.name} to wishlist!`);
    }
  };

  // Slider Settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } }
    ]
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-stone-950 via-purple-950 to-stone-950 text-stone-100">
        <div className="relative flex items-center justify-center">
          {/* Outer Rotating Glowing Ring */}
          <div className="w-12 h-12 rounded-full border-4 border-t-rose-400 border-r-amber-400/30 border-b-purple-500/20 border-l-transparent animate-spin"></div>
          
          {/* Inner Counter-Rotating Pulse Ring */}
          <div className="absolute w-8 h-8 rounded-full border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-teal-400 animate-spin [animation-duration:1.5s] reverse"></div>
          
          {/* Core Center Luxury Dot */}
          <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 animate-pulse"></div>
        </div>
        
        {/* Cinematic Subtitle Typography */}
        <p className="mt-8 text-xs font-light uppercase tracking-[0.3em] text-rose-400/80 animate-pulse">
          Premium Masterpieces...
        </p>
      </div>
    )
  }

  // 📦 CARD COMPONENT RENDER ENGINE
  const renderProductCard = (product, isMobileView) => {
    const isInWishlist = wishlistItems.find(x => x._id === product._id);

    return (
      <div key={product._id} className={`${isMobileView ? 'w-full' : 'px-3 h-full'} box-border`}>
        <div className="bg-purple-300 rounded-2xl overflow-hidden flex flex-col h-full relative group shadow-lg w-full">
          
          {/* Image and Tag Container */}
          <div className="relative pt-[110%] bg-purple-300 m-4 rounded-xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              onClick={() => setSelectedProduct(product)}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
            />
            
            <span className="absolute top-3 left-3 bg-rose-200 text-purple-500 font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xl backdrop-blur-md">
              {product.category}
            </span>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlistHandler(product);
              }}
              className="absolute top-3 right-3 hover:text-rose-400 cursor-pointer p-2.5 rounded-xl text-stone-400 backdrop-blur-md transition-colors z-30"
            >
              <FaHeart className={isInWishlist ? "fill-rose-500 text-rose-500" : ""} />
            </button>

            {product.countInStock === 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-red-600/90 text-white font-bold text-[10px] tracking-widest px-3 py-1.5 rounded-lg uppercase">Sold Out</span>
              </div>
            )}
          </div>

          {/* Metadata Content */}
          <div className="p-4 flex flex-col flex-grow justify-between bg-purple-300 w-full box-border">
            <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              <span className="text-[10px] uppercase tracking-wider text-purple-500 font-bold">{product.gender}</span>
              <h3 className="text-rose-400 font-serif font-bold text-md mt-0.5 line-clamp-1">{product.name}</h3>
              <p className="text-stone-400 text-xs font-light line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Matrix Panel */}
            <div className="mt-4 pt-3 border-t border-rose-400/60 flex items-center justify-between w-full">
              <span className="text-xl font-bold text-stone-600 font-sans">$ {product.price?.toLocaleString()}</span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-md text-stone-300 hover:text-rose-400 cursor-pointer p-2 rounded-full transition-colors"
                  title="View Details"
                >
                  <FaEye />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartHandler(product);
                  }}
                  disabled={product.countInStock === 0}
                  className={`p-2 rounded-full text-white text-xs cursor-pointer hover:text-rose-400 transition-all ${
                    product.countInStock === 0 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-stone-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90'
                  }`}
                  title="Add to Vault Cart"
                >
                  <FaShoppingBag />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-rose-950/60 py-16 px-4 sm:px-8 lg:px-12 border-t border-stone-900/60 relative w-full box-border">
      
      {/* 🎯 FLOATING NOTIFICATION POPUP PANEL */}
      {showPopup && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto min-w-[280px] border px-4 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2.5 backdrop-blur-md bg-opacity-95 transition-all duration-300 ${
          isErrorPopup ? 'bg-red-950 text-red-200 border-red-800' : 'bg-stone-950 text-stone-100 border-stone-800'
        }`}>
          {isErrorPopup ? <FaExclamationCircle className="text-red-400 text-sm shrink-0" /> : <FaCheckCircle className="text-emerald-400 text-sm shrink-0" />}
          <span className="text-[11px] font-medium tracking-wide text-center line-clamp-1">
            {popupMessage}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center mb-15">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r p-2 rounded-xl shadow-md animate-pulse from-blue-400 to-rose-400">Exclusive Shelf</span>
            <h2 className="text-3xl md:text-3xl font-serif font-bold text-rose-400 tracking-wide mt-1">Premium Collection</h2>
          </div>
        </div>

        {!products || products.length === 0 ? (
          <p className="text-stone-500 text-xs py-6">The vault is currently preparing entries...</p>
        ) : isMobile ? (
          <div className="w-full flex flex-col gap-6 px-0 box-border">
            {products.map((product) => product && typeof product === 'object' && renderProductCard(product, true))}
          </div>
        ) : (
          <div className="relative premium-slider-wrapper">
            <Slider {...settings}>
              {products.map((product) => product && typeof product === 'object' && renderProductCard(product, false))}
            </Slider>
          </div>
        )}

        <style>{`
          .premium-slider-wrapper .slick-dots li button:before { color: #57534e !important; }
          .premium-slider-wrapper .slick-dots li.slick-active button:before { color: #c084fc !important; }
          .premium-slider-wrapper .slick-dots { bottom: -35px; }
        `}</style>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </div>
    </section>
  );
};

export default PremiumCollection;