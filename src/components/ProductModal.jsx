import React, { useContext } from 'react';
import { FaTimes, FaShoppingBag } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  if (!product) return null;

  const isOutOfStock = product.countInStock === 0;

  // 🎯 DYNAMIC IMAGE FALLBACK: Handles both .image and .imageUrl structures cleanly
  const currentImage = product.image || product.imageUrl || "";

  // 🎯 DYNAMIC BRAND FALLBACK: Extracts brand even if key casing differs in state arrays
  const currentBrand = product.brand || product.brandName || product.Brand || "";

  const addToCartHandler = () => {
    if (isOutOfStock) return;
    const itemExists = cartItems.find((x) => x._id === product._id);
    if (itemExists) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    onClose(); // Hide modal after adding to cart
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      {/* Main container with max-h-[85vh] and overflow-y-auto for small screens */}
      <div className="bg-purple-300 border border-stone-800 rounded-3xl overflow-y-auto md:overflow-hidden max-w-2xl w-full max-h-[85vh] md:max-h-none relative shadow-2xl flex flex-col md:flex-row box-border">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-300 hover:text-purple-900/50 hover:bg-stone-300 cursor-pointer z-10 p-2 bg-purple-950/60 rounded-full border border-stone-800/40">
          <FaTimes className="w-4 h-4" />
        </button>

        {/* 🛠️ Product Image Panel (PERFECT MOBILE WIDTH FIX) */}
        <div className="w-full md:w-1/2 bg-purple-300 h-56 sm:h-64 md:h-auto m-0 md:m-3 rounded-t-3xl md:rounded-xl relative flex-shrink-0 flex items-center justify-center p-0 md:p-2 overflow-hidden">
          {/* 🎯 FIXED: Replaced static assignment with dynamic currentImage fallback */}
          <img 
            src={currentImage} 
            alt={product.name} 
            className="w-full h-full object-cover md:object-contain" 
          />
          
          {/* Ambient overlay mask consistent with your theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-stone-950/20 to-transparent"></div>
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center w-full h-full z-20">
              <span className="bg-red-600 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-lg uppercase">Sold Out</span>
            </div>
          )}
        </div>

        {/* Content Panel */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4 flex-grow box-border">
          <div>
            {/* Category Badge (Clean Single View) */}
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-rose-300 bg-purple-950/40 border border-purple-800/30 px-2 py-0.5 rounded-md">
              {product.category}
            </span>

            {/* Product Name */}
            <h3 className="text-lg sm:text-xl font-serif font-bold text-rose-400 mt-2 line-clamp-1 sm:line-clamp-none">
              {product.name}
            </h3>

            {/* 🎯 FIXED: String fallback mapping ensures rendering even if backend payload lags during initial sync */}
            {currentBrand && String(currentBrand).trim() !== "" && (
              <p className="text-xs font-serif font-bold italic text-purple-950 tracking-wide my-2 flex items-center gap-1.5">
                Brand: <span className='text-rose-300 bg-purple-950/40 px-2 py-0.5 rounded-md font-sans not-italic text-[11px] shadow-sm'>{currentBrand}</span>
              </p>
            )}

            {/* Gender/Collection Tag */}
            <span className="text-[10px] sm:text-xs text-stone-500 font-medium block mt-1.5">
              {product.gender} Collection
            </span>
            
            {/* Description box */}
            <p className="text-stone-300 text-[11px] sm:text-xs font-light leading-relaxed mt-3 bg-stone-950/40 p-3 rounded-xl max-h-24 overflow-y-auto sm:max-h-none">
              {product.description || "Immerse yourself in artisanal luxury. This premium long-lasting formula delivers a sovereign presence that leaves a captivating signature trace."}
            </p>
          </div>

          {/* Price & Action Section */}
          <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between gap-2 mt-auto">
            <div>
              <p className="text-[9px] uppercase text-stone-500 tracking-wider">Vault Price</p>
              <span className="text-lg sm:text-xl font-bold text-amber-400 font-sans">Rs. {product.price?.toLocaleString()}</span>
            </div>

            <button
              onClick={addToCartHandler}
              disabled={isOutOfStock}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-white transition-all flex-shrink-0 ${
                isOutOfStock ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-90 active:scale-95'
              }`}
            >
              <FaShoppingBag className="text-[10px] sm:text-xs" />
              {isOutOfStock ? 'Out of Stock' : 'Secure Bottle'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;