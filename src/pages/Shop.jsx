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
      <div className="text-center py-20 bg-stone-950 text-stone-500 animate-pulse text-xs uppercase tracking-widest">
        Loading Luxury Inventory...
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