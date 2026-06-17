import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem('wishlistItems')) || []);

  // Sync state modifications with LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);


  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, setCartItems, setWishlistItems }}>
      {children}
    </CartContext.Provider>
  );
};