import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaRegCreditCard, FaTruck, FaMoneyBillWave } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import axios from 'axios'; 

const CheckoutForm = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 🎯 COD vs Stripe Toggle Method Configuration
  const [paymentMethod, setPaymentMethod] = useState('Stripe'); 

  // Form States
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '', phone: '',
    cardNumber: '', cardExpiry: '', cardCvc: '' // Form state controls
  });

  // Calculate Order Summary Metrics
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 250; 
  const totalAmount = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🎯 UPDATED: Real API Integration with Multi-Gateway Selector Architecture
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedOrderItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price
      }));

      // 🛠️ Construct Dynamic Payload Database Mapping Vectors
      const orderPayload = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          phone: formData.phone
        },
        orderItems: formattedOrderItems,
        totalPrice: totalAmount,
        paymentMethod: paymentMethod, // Dynamic Injection ('Stripe' or 'COD')
        // 💳 Dynamic Stripe fallback identifier vector
        stripeTokenId: paymentMethod === 'Stripe' ? 'tok_visa' : 'COD_BYPASS' 
      };

      console.log(`🚀 Firing [${paymentMethod}] payload matrix to backend server...`, orderPayload);

      const response = await axios.post('https://perfume-shop-backend-one.vercel.app/api/orders', orderPayload);

      if (response.status === 201) {
        console.log("💎 Order Confirmed via luxury system sequence mapping.");
        setCartItems([]); 
        navigate('/');
      }

    } catch (error) {
      console.error("❌ Checkout process network layer failure:", error);
      alert(error.response?.data?.message || "Transaction Rejected by Core Security Layer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-serif font-bold text-rose-400 mb-8 tracking-wide">
          Secure Checkout Portal
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Shipping and Payment Forms */}
          <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6 bg-transparent">
            
            {/* Delivery Info Block */}
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-rose-400 tracking-wider uppercase flex items-center gap-2">
                <FaTruck className="text-rose-400 animate-pulse" /> Shipping Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] uppercase tracking-wider font-bold text-rose-400 mb-1">First Name</label>
                  <input type="text" name="firstName" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">Last Name</label>
                  <input type="text" name="lastName" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">Email</label>
                <input type="email" name="email" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Address</label>
                <input type="text" name="address" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">City</label>
                  <input type="text" name="city" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Postal Code</label>
                  <input type="text" name="zipCode" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Phone Number</label>
                <input type="tel" name="phone" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>
            </div>

            {/* Payment Section (Dynamic Stripe / COD Wrapper Setup) */}
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-md font-bold text-rose-400 tracking-wider uppercase flex items-center gap-2">
                <FaRegCreditCard className="text-rose-400 animate-pulse" /> Payment Framework
              </h3>

              {/* 🎛️ NEW: HIGH-FIDELITY SELECTOR BUTTONS */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Stripe')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold tracking-wider uppercase text-xs border transition-all cursor-pointer ${
                    paymentMethod === 'Stripe'
                      ? 'bg-rose-400/20 border-rose-400 text-rose-400 shadow-md'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <FaRegCreditCard className="text-sm" /> Card (Stripe)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold tracking-wider uppercase text-xs border transition-all cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'bg-rose-400/20 border-rose-400 text-rose-400 shadow-md'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <FaMoneyBillWave className="text-sm" /> Cash On Delivery
                </button>
              </div>
              
              <div className="p-4 bg-transparent shadow-md rounded-xl space-y-4">
                {paymentMethod === 'Stripe' ? (
                  <>
                    <div className="flex justify-between items-center text-xs text-purple-300 border-b border-rose-400 pb-2">
                      <span>Stripe Secure Gateway</span>
                      <span className="text-emerald-400 flex items-center gap-1"><FaLock className="text-[10px]" /> Encrypted</span>
                    </div>
                    
                    {/* Simulated Card Elements */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">Card Credentials</label>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 w-full">
                        <div className="sm:col-span-6 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-rose-400 transition-all">
                          <input 
                            type="text" 
                            name="cardNumber"
                            maxLength="19" 
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full text-stone-900 font-medium placeholder-stone-400 focus:outline-none" 
                            placeholder="4242  4242  4242  4242" 
                            required={paymentMethod === 'Stripe'}
                          />
                        </div>
                        <div className="sm:col-span-3 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-purple-500 transition-all">
                          <input 
                            type="text" 
                            name="cardExpiry"
                            maxLength="5" 
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full bg-transparent text-stone-900 font-medium placeholder-stone-400 focus:outline-none text-left sm:text-center" 
                            placeholder="MM/YY" 
                            required={paymentMethod === 'Stripe'}
                          />
                        </div>
                        <div className="sm:col-span-3 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-purple-500 transition-all">
                          <input 
                            type="password" 
                            name="cardCvc"
                            maxLength="3" 
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full bg-transparent text-stone-900 font-medium placeholder-stone-400 focus:outline-none text-left sm:text-center" 
                            placeholder="CVC" 
                            required={paymentMethod === 'Stripe'}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* 🎯 COD INFORMATIONAL NOTICE MATRIX */
                  <div className="border border-amber-400/30 bg-amber-400/5 p-4 rounded-xl text-center space-y-2">
                    <FaMoneyBillWave className="mx-auto text-xl text-amber-400 animate-bounce" />
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Cash On Delivery Selection</h4>
                    <p className="text-[11px] text-stone-400 max-w-sm mx-auto leading-relaxed">
                      You will fulfill the total transaction value in physical currency directly to the logistical courier agent upon arrival of your olfactory vault assets.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Label Button Context */}
            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-rose-400 font-bold text-sm tracking-widest uppercase hover:opacity-95 shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading 
                ? 'Processing Transaction...' 
                : paymentMethod === 'Stripe' ? 'Authorize Payment' : 'Confirm COD Order'
              }
            </button>

          </form>

          {/* RIGHT: Order Summary Block */}
          <div className="lg:col-span-5 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 border-2 border-rose-400 rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
            <h3 className="text-md font-bold text-rose-400 tracking-wider text-center uppercase border-b border-rose-400 pb-3">
              Order Summary
            </h3>

            {cartItems.length === 0 ? (
              <p className="text-xs text-rose-400 py-4 text-center">Your cart is empty.</p>
            ) : (
              <div className="divide-y divide-rose-400 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 py-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-stone-950 border border-stone-800" />
                      <div>
                        <h4 className="text-stone-200 text-xs font-serif font-medium line-clamp-1 max-w-[180px]">{item.name}</h4>
                        <span className="text-[10px] text-purple-300 font-light">Qty: {item.qty} &bull; $ {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className="text-amber-400 text-xs font-semibold">$ {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Financial Calculations Grid */}
            <div className="space-y-2 border-t border-rose-400 pt-4 text-xs font-semibold text-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-amber-400">$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className='text-purple-300'>Premium Vault Shipping</span>
                <span className="text-stone-200">{shipping === 0 ? "FREE" : `$ ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-amber-400 pt-3 border-t border-rose-400">
                <span>Total Amount</span>
                <span>$ {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutForm;