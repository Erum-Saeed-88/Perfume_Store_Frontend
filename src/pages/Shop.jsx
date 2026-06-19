import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopFilters from '../components/ShopFilters'; 
import ProductCard from '../components/ProductCard'; 
import ShopHero from '../components/ShopHero';
import ProductModal from '../components/ProductModal'; // 🎯 NEW IMPORT: Imported your custom layout modal component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 NEW STATE: To track which fragrance elixir is currently selected for deep analytics view
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🎛️ Filter and Sort States (Connected to ShopFilters)
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  // 📡 Fetch Data from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://perfume-shop-backend-one.vercel.app/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching shop products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // =========================================================================
  // 🔥 THE REAL FIX: Frontend Filter & Sort Logic Matrix
  // =========================================================================
  const filteredProducts = products
    .filter((product) => {
      // 1. Gender Filter Match
      const matchesGender = gender ? product.gender?.toLowerCase() === gender.toLowerCase() : true;
      // 2. Category Filter Match
      const matchesCategory = category ? product.category?.toLowerCase() === category.toLowerCase() : true;
      
      return matchesGender && matchesCategory;
    })
    .sort((a, b) => {
      // 3. Sorting Execution
      if (sort === 'priceAsc') return a.price - b.price; // Low to High
      if (sort === 'priceDesc') return b.price - a.price; // High to Low
      return 0; // Default sorting
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-stone-950 via-purple-950 to-stone-950 text-stone-100">
        <div className="relative flex items-center justify-center">
          {/* Outer Rotating Glowing Ring */}
          <div className="w-12 h-12 rounded-full border-4 border-t-rose-400 border-r-amber-400/30 border-b-purple-500/20 border-l-transparent animate-spin"></div>
          
          {/* Inner Counter-Rotating Pulse Ring */}
          <div className="absolute w-8 h-8 rounded-full border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-rose-400 animate-spin [animation-duration:1.5s] reverse"></div>
          
          {/* Core Center Luxury Dot */}
          <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 animate-pulse"></div>
        </div>
        
        {/* Cinematic Subtitle Typography */}
        <p className="mt-8 text-xs font-light uppercase tracking-[0.3em] text-rose-400/80 animate-pulse">
          Curating Olfactory Masterpieces...
        </p>
      </div>
    );
  }

  return (
    <>
      <ShopHero />
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 min-h-screen py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* 🎛️ Filter Component (Passing states and setters) */}
          <ShopFilters 
            gender={gender} 
            setGender={setGender} 
            category={category} 
            setCategory={setCategory} 
            sort={sort} 
            setSort={setSort} 
          />
          <h2 className='text-center text-rose-400 text-4xl font-bold mb-15'>Our Collections</h2>

          {/* 🛍️ Dynamic Clean Layout Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 border-2 border-rose-400 rounded-2xl bg-transparent shadow-md">
              <p className="text-stone-500 text-sm">No exquisite matches located in this category matrix.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
              {filteredProducts.map((product) => (
                <div key={product._id} className="h-full">
                  {/* 🎯 FIXED: Passed setSelectedProduct state handler as prop to connect click actions */}
                  <ProductCard product={product} setSelectedProduct={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          🎯 MODAL PORTAL: Active listener that maps state parameters to screen overlays
         ========================================================================= */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};

export default Shop;