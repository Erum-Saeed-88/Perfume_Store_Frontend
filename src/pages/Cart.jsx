import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // 1. Quantity change handler (Plus/Minus operations)
  const updateQtyHandler = (product, newQty) => {
    if (newQty < 1 || newQty > product.countInStock) return;
    setCartItems(cartItems.map((x) => x._id === product._id ? { ...x, qty: newQty } : x));
  };

  // 2. Remove single item handler
  const removeItemHandler = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  // 3. Mathematical Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingThreshold = 10000;
  const shipping = subtotal > shippingThreshold || subtotal === 0 ? 0 : 250;
  const totalAmount = subtotal + shipping;

  // Free shipping progress bar percentage
  const progressToFreeShipping = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-rose-400 mb-2 tracking-wide">
            Your Shopping Vault
          </h2>
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-4 font-light">
            Review your chosen elixirs before secure dispatch
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart UI State */
          <div className="text-center py-20 border border-dashed border-stone-800 rounded-3xl bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 max-w-md mx-auto px-6">
            <FaShoppingBag className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-stone-300 mb-2">Your Cart is Empty</h3>
            <p className="text-xs text-stone-500 font-light mb-6">
              Looks like you haven't added any luxury fragrances yet.
            </p>
            <Link 
              to="/shop" 
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-white font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Return To Shop
            </Link>
          </div>
        ) : (
          /* Cart Main Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: ITEMS LIST (8 Columns) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Dynamic Progress Widget */}
              <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/90 shadow-md p-4 rounded-xl text-xs font-light">
                {subtotal >= shippingThreshold ? (
                  <span className="text-emerald-400 font-medium">🎉 Congratulations! Your order qualifies for **Free Premium Vault Shipping**.</span>
                ) : (
                  <span className="text-stone-300">
                    Add <strong className="text-amber-400">Rs. {(shippingThreshold - subtotal).toLocaleString()}</strong> more to unlock **Free Shipping**.
                  </span>
                )}
                <div className="w-full bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-md h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-400 transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  ></div>
                </div>
              </div>

              {/* Individual Items Loop Wrapper */}
              <div className="divide-y divide-stone-300/60 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-md rounded-2xl p-6 shadow-xl">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row gap-4 py-5 first:pt-0 last:pb-0 items-center justify-between">
                    
                    {/* Image & Title Meta */}
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-xl bg-stone-950 border border-stone-800 flex-shrink-0" 
                      />
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-purple-400">{item.category}</span>
                        <h4 className="text-stone-100 text-sm font-serif font-medium line-clamp-1 max-w-[200px] sm:max-w-[280px]">{item.name}</h4>
                        <p className="text-xs text-amber-400 font-sans font-medium mt-0.5">Rs. {item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete Sub-grid */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t border-stone-800/40 sm:border-t-0 pt-3 sm:pt-0">
                      {/* Counter Widget */}
                      <div className="flex items-center bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/90 border border-stone-800 rounded-xl p-1">
                        <button 
                          onClick={() => updateQtyHandler(item, item.qty - 1)}
                          className="text-stone-400 hover:text-stone-200 p-2 text-[10px] transition-colors"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-xs font-semibold px-3 text-stone-200 w-8 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQtyHandler(item, item.qty + 1)}
                          className="text-stone-400 hover:text-stone-200 p-2 text-[10px] transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      {/* Total Item Price Counter */}
                      <span className="text-xs font-bold text-stone-200 w-24 text-right hidden sm:block">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>

                      {/* Delete Icon Trigger */}
                      <button 
                        onClick={() => removeItemHandler(item._id)}
                        className="text-rose-400 hover:text-white cursor-pointer animate-pulse p-2 transition-colors"
                        title="Remove item"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: ORDER INVOICE SUMMARY (4 Columns) */}
            <div className="lg:col-span-4 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-md rounded-2xl p-6 shadow-xl space-y-6 sticky top-28">
              <h3 className="text-md text-rose-400 text-center font-bold tracking-wider uppercase border-b border-rose-400 pb-3">
                Order Invoice
              </h3>

              <div className="space-y-3 text-xs font-light text-amber-400 font-semibold">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="text-stone-200">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Premium Vault Shipping</span>
                  <span className="text-stone-200">{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
                </div>
                
                <div className="flex justify-between text-base font-serif font-bold text-amber-400 pt-4 border-t border-rose-400">
                  <span>Total Amount</span>
                  <span className='text-olive-400'>Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA Navigation Trigger */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-rose-400 font-bold text-xs tracking-widest uppercase hover:opacity-95 hover:text-white cursor-pointer shadow-xl flex items-center justify-center gap-2 group transition-all"
              >
                Proceed To Checkout
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-[10px] text-stone-500 font-light text-center">
                🔒 Secured with 256-bit bank level SSL encryption
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;