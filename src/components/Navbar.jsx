import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUser, FaSignOutAlt, FaBars, FaTimes, FaSlidersH } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartItems, wishlistItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Safe check for admin role (handles both 'Admin' and 'admin')
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif p-2 rounded-xl shadow-md font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity">
              SCENTSATION
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className=" hover:text-rose-300 text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity uppercase hover:underline transition-colors">Home</Link>
            <Link to="/about" className="hover:text-rose-300 text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity uppercase hover:underline transition-colors">About</Link>
            <Link to="/shop" className="hover:text-rose-300 text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity uppercase hover:underline transition-colors">Shop</Link>
            <Link to="/contact" className="hover:text-rose-300 text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity uppercase hover:underline transition-colors">Contact</Link>
            
            {/* 🔥 Desktop Admin Link (Case-Insensitive Protected) */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold  hover:opacity-90 hover:text-amber-400 transition-opacity px-4 py-1 text-xs uppercase tracking-widest rounded-xl font-bold hover:border-rose-400 hover:text-rose-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <FaSlidersH className="w-3 h-3" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Icon Controls Section */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Wishlist Link */}
            <Link to="/wishlist" className="relative text-rose-200 hover:text-rose-300 animate-pulse transition-colors">
              <FaHeart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="relative hover:opacity-90 text-rose-200 animate-pulse transition-opacity hover:text-rose-300 transition-colors">
            <span className="flex items-center gap-1.5">
              <FaShoppingBag className="w-5 h-5 "/>
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-amber-400 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Controller */}
            {user ? (
              <div className="flex items-center gap-4 border-l border-stone-100/20 pl-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-300 font-bold text-xs font-bold flex gap-2"><FaUser className='text-rose-200 animate-pulse' /> {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-rose-200 animate-pulse hover:text-rose-400 transition-colors">
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-rose-200 animate-pulse hover:text-rose-400 transition-opacity">
                <FaUser className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-100 md:hidden focus:outline-none">
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-950/95 backdrop-blur-md mt-4 border-t border-stone-800">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
            
            {/* 🔥 Mobile Admin Link (Protected - Top of the List if Admin) */}
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block text-rose-400 bg-amber-500/10 border-2 border-rose-400 py-2.5 my-2 mx-4 font-bold text-xs uppercase tracking-widest rounded-xl"
              >
                 Admin Dashboard
              </Link>
            )}

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-rose-400 py-2 hover:bg-stone-900 rounded-lg">Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-rose-400 py-2 hover:bg-stone-900 rounded-lg">About</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-rose-400 py-2 hover:bg-stone-900 rounded-lg">Shop</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-rose-400 py-2 hover:bg-stone-900 rounded-lg">Contact</Link>
            
            <div className="border-t border-stone-800 my-2 pt-2 flex justify-around items-center max-w-[200px] mx-auto">
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-rose-400 relative">
                <FaHeart className="w-5 h-5" />
                {wishlistItems.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlistItems.length}</span>}
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-rose-400 relative">
                <FaShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartItems.length}</span>}
              </Link>
              {user ? (
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-rose-400"><FaSignOutAlt className="w-5 h-5" /></button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-rose-400"><FaUser className="w-5 h-5" /></Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;