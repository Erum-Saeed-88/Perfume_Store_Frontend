import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// 🎯 CRITICAL FIX: Destructuring Slider because of ES Modules/Vite object handling issue
import SlickSlider from 'react-slick';
import { FaShoppingBag, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
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
  const { cartItems, setCartItems } = useContext(CartContext);

  // 🎯 REAL TIME BREAKPOINT TRACKER: Tracks 357px and small devices instantly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 540) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    // Initial check
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

  const addToCartHandler = (product) => {
    if (product.countInStock === 0) return;
    const itemExists = cartItems.find((x) => x._id === product._id);
    if (itemExists) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Slider Settings (Used only for large screens now)
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

  if (loading) return <div className="text-center py-10 text-stone-500 animate-pulse text-xs uppercase tracking-widest">Unlocking Premium Vault...</div>;

  // 📦 CARD COMPONENT (Extracted into a clean variable to avoid code duplication)
  const renderProductCard = (product, isMobileView) => (
    <div key={product._id} className={`${isMobileView ? 'w-full' : 'px-3 h-full'} box-border`}>
      <div className="bg-purple-300 rounded-2xl overflow-hidden flex flex-col h-full relative group shadow-lg w-full">
        
        {/* Image and Tag Container */}
        <div className="relative pt-[110%] bg-purple-300 m-4 rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
          
          <span className="absolute top-3 left-3 bg-rose-200 text-purple-500 font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xl backdrop-blur-md">
            {product.category}
          </span>

          {product.countInStock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600/90 text-white font-bold text-[10px] tracking-widest px-3 py-1.5 rounded-lg uppercase">Sold Out</span>
            </div>
          )}
        </div>

        {/* Metadata Content */}
        <div className="p-4 flex flex-col flex-grow justify-between bg-purple-300 w-full box-border">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">{product.gender}</span>
            <h3 className="text-rose-400 font-serif font-bold text-md mt-0.5 line-clamp-1">{product.name}</h3>
            <p className="text-stone-400 text-xs font-light line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
          </div>

          {/* Action Matrix Panel */}
          <div className="mt-4 pt-3 border-t border-rose-400/60 flex items-center justify-between w-full">
            <span className="text-xl font-bold text-amber-400 font-sans">$ {product.price?.toLocaleString()}</span>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedProduct(product)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-md text-stone-300 hover:text-rose-400 cursor-pointer p-2 rounded-full transition-colors"
                title="View Details"
              >
                <FaEye />
              </button>

              <button
                onClick={() => addToCartHandler(product)}
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

  return (
    <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-rose-950/60 py-16 px-4 sm:px-8 lg:px-12 border-t border-stone-900/60 relative w-full box-border">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="flex justify-center mb-15">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">Exclusive Shelf</span>
            <h2 className="text-3xl md:text-3xl font-serif font-bold text-rose-400 tracking-wide mt-1">Premium Collection</h2>
          </div>
        </div>

        {/* Dynamic Render Controller */}
        {!products || products.length === 0 ? (
          <p className="text-stone-500 text-xs py-6">The vault is currently preparing entries...</p>
        ) : isMobile ? (
          /* 🔥 1. MOBILE CONDITION: Slick slider bypass, purely rendering native 1-Column full width layout */
          <div className="w-full flex flex-col gap-6 px-0 box-border">
            {products.map((product) => product && typeof product === 'object' && renderProductCard(product, true))}
          </div>
        ) : (
          /* 💻 2. DESKTOP CONDITION: Render standard luxurious Slick Slider layout */
          <div className="relative premium-slider-wrapper">
            <Slider {...settings}>
              {products.map((product) => product && typeof product === 'object' && renderProductCard(product, false))}
            </Slider>
          </div>
        )}

        {/* Slick Slide Slick-Dots Global Overwrite Styling */}
        <style>{`
          .premium-slider-wrapper .slick-dots li button:before { color: #57534e !important; }
          .premium-slider-wrapper .slick-dots li.slick-active button:before { color: #c084fc !important; }
          .premium-slider-wrapper .slick-dots { bottom: -35px; }
        `}</style>

        {/* Dynamic Layered Pop-up Integration */}
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

      </div>
    </section>
  );
};

export default PremiumCollection;