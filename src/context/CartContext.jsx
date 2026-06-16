import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlistItems')) || []);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Sync state modifications with LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, theme, toggleTheme, setCartItems, setWishlistItems }}>
      {children}
    </CartContext.Provider>
  );
};