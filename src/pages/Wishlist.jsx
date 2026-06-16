import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaHeartBroken } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, setWishlistItems, cartItems, setCartItems } = useContext(CartContext);

  // Remove Item from Wishlist handler
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
  };

  // Move from Wishlist to Cart handler
  const moveToCart = (product) => {
    if (product.countInStock === 0) return;
    
    // Check if already in cart
    const itemExists = cartItems.find((x) => x._id === product._id);
    if (itemExists) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    // Remove from wishlist after moving
    removeFromWishlist(product._id);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-rose-400 bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 mb-2 tracking-wide">
            Your Premium Wishlist
          </h2>
          <p className="text-xs text-stone-400 tracking-widest uppercase font-light">
            Your personal curation of luxury olfactory masterpieces
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-20 border-2 border-rose-400 rounded-3xl bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 max-w-md mx-auto px-6">
            <FaHeartBroken className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-amber-400 mb-2">Wishlist is Empty</h3>
            <p className="text-xs text-stone-500 font-light mb-6">
              You haven't saved any luxury fragrances yet. Explore our catalog to find your signature scent.
            </p>
            <Link 
              to="/shop" 
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-rose-400 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Discover Scents
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div 
                key={product._id} 
                className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-md p-3 rounded-2xl overflow-hidden flex flex-col h-100 relative group"
              >
                {/* Image Container */}
                <div className="relative pt-[110%] bg-transparent overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  
                  {/* Delete Button Badge */}
                  <button 
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-4 right-4 text-purple-600 cursor-pointer hover:text-rose-400 p-2.5 rounded-xl backdrop-blur-md transition-colors"
                    title="Remove from Wishlist"
                  >
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Info Metadata Card */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      {product.category}
                    </span>
                    <h3 className="text-rose-400 font-serif font-medium text-xl mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-amber-400 font-sans mt-2">
                      Rs. {product.price?.toLocaleString()}
                    </p>
                  </div>

                  {/* Action Trigger Button */}
                  <div className="mt-5 pt-4 border-t border-stone-800">
                    <button 
                      onClick={() => moveToCart(product)}
                      disabled={product.countInStock === 0}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white transition-all ${
                        product.countInStock === 0 
                          ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700/30' 
                          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 hover:opacity-90'
                      }`}
                    >
                      <FaShoppingBag className="text-xs" />
                      {product.countInStock === 0 ? 'Out of Stock' : 'Move to Cart'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;