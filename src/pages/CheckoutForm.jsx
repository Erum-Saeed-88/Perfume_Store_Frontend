import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaRegCreditCard, FaTruck } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import axios from 'axios'; // 🎯 Import Axios for real API injection

const CheckoutForm = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '', phone: ''
  });

  // Calculate Order Summary Metrics
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 250; 
  const totalAmount = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🎯 FIXED: Real API Integration Handler
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 📦 Order Items Formatting for MongoDB validation schema compatibility
      const formattedOrderItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price
      }));

      // 🛠️ Construct Payload Database Mapping Vectors
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
        paymentMethod: 'Stripe', // Auto lock to stripe system for current scenario
        stripeTokenId: 'tok_visa' // 💳 Stripe Test Mode ka Token pass kar rahe hain dynamic integration tak
      };

      console.log("🚀 Firing payload vector matrix to backend server...", orderPayload);

      // 🔥 REAL API CALL: Direct hit onto port 8000
      const response = await axios.post('https://perfume-shop-backend-one.vercel.app/api/orders', orderPayload);

      if (response.status === 201) {
        console.log("💎 Order Confirmed & email sent successfully.");
        setCartItems([]); // Clear local shopping state
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
                  <input type="text" name="firstName" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">Last Name</label>
                  <input type="text" name="lastName" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">Email</label>
                <input type="email" name="email" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Address</label>
                <input type="text" name="address" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] uppercase font-bold tracking-wider text-rose-400 mb-1">City</label>
                  <input type="text" name="city" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Postal Code</label>
                  <input type="text" name="zipCode" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-rose-400 mb-1">Phone Number</label>
                <input type="tel" name="phone" required onChange={handleInputChange} className="w-full bg-purple-300 p-3 rounded-xl text-sm text-rose-400 focus:outline-none focus:border-rose-400 transition-colors" />
              </div>
            </div>

            {/* Payment Section (Stripe UI Layout Mockup) */}
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60  border-2 border-rose-400  rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-rose-400 tracking-wider uppercase flex items-center gap-2">
                <FaRegCreditCard className="text-rose-400 animate-pulse" /> Payment Framework
              </h3>
              
              <div className="p-4 bg-transparent shadow-md rounded-xl space-y-4">
                <div className="flex justify-between items-center text-xs text-purple-300 border-b border-rose-400 pb-2">
                  <span>Stripe Secure Gateway</span>
                  <span className="text-emerald-400 flex items-center gap-1"><FaLock className="text-[10px]" /> Encrypted</span>
                </div>
                
                {/* Simulated Card Elements */}
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">Card Credentials</label>
  
  {/* 🎯 RESPONSIVE GRID MATRIX: Mobile par columns (gap-3), tablet/laptop par single line block */}
  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 w-full">
    
    {/* 💳 1. CARD NUMBER INPUT (Mobile: Full Width | Desktop: 6 Columns Out of 12) */}
    <div className="sm:col-span-6 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-rose-400 transition-all">
      <input 
        type="text" 
        name="cardNumber"
        maxLength="19" 
        onChange={handleInputChange}
        className="w-full text-rose-400 font-medium placeholder-stone-400 focus:outline-none caret-purple-500" 
        placeholder="4242  4242  4242  4242" 
        required
      />
    </div>
    
    {/* 📅 2. EXPIRY DATE INPUT (Mobile: Full Width | Desktop: 3 Columns Out of 12) */}
    <div className="sm:col-span-3 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-purple-500 transition-all">
      <input 
        type="text" 
        name="cardExpiry"
        maxLength="5" 
        onChange={handleInputChange}
        className="w-full bg-transparent text-rose-400 font-medium placeholder-stone-400 focus:outline-none caret-purple-500 text-left sm:text-center" 
        placeholder="MM/YY" 
        required
      />
    </div>
    
    {/* 🔒 3. CVC SECURITY CODE INPUT (Mobile: Full Width | Desktop: 3 Columns Out of 12) */}
    <div className="sm:col-span-3 bg-purple-300 p-3 rounded-xl flex items-center focus-within:border-purple-500 transition-all">
      <input 
        type="password" 
        name="cardCvc"
        maxLength="4" 
        onChange={handleInputChange}
        className="w-full bg-transparent text-rose-400 font-medium placeholder-stone-400 focus:outline-none caret-purple-500 text-left sm:text-center" 
        placeholder="CVC" 
        required
      />
    </div>

  </div>
</div>
              </div>
            </div>

            {/* Main Submit Checkout Button Wrapper */}
            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-rose-400 font-bold text-sm tracking-widest uppercase hover:opacity-95 shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing Transaction...' : `Authorize Payment`}
            </button>

          </form>

          {/* RIGHT: Order Summary Block */}
          <div className="lg:col-span-5 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60  border-2 border-rose-400  rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
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