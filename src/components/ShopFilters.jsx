import React from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const ShopFilters = ({ gender, setGender, category, setCategory, sort, setSort }) => {
  const categories = ['Body Spray', 'Eau De Perfume', 'Attar Perfume'];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 rounded-2xl p-6 mb-10 shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        
        {/* Gender & Category Filters */}
        <div className="w-full md:w-auto flex flex-wrap gap-3 items-center">
          <div className="flex bg-stone-200 p-1.5 rounded-xl">
            <button 
              onClick={() => setGender('')} 
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase cursor-pointer rounded-lg transition-all ${!gender ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-rose-400' : 'text-stone-500'}`}
            >
              All Scents
            </button>
            <button 
              onClick={() => setGender('Men')} 
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase cursor-pointer rounded-lg transition-all ${gender === 'Men' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-rose-400' : 'text-stone-500'}`}
            >
              Men
            </button>
            <button 
              onClick={() => setGender('Women')} 
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase cursor-pointer rounded-lg transition-all ${gender === 'Women' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-rose-400' : 'text-stone-500'}`}
            >
              Women
            </button>
          </div>

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-stone-200 border border-stone-800 text-rose-400 text-sm font-bold cursor-pointer py-3 px-4 rounded-xl focus:outline-none focus:border-rose-400 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="w-full md:w-auto flex items-center gap-3 bg-stone-200 border-2 border-rose-400 px-4 py-1.5 rounded-xl">
          <FaSortAmountDown className="text-rose-400 animate-pulse text-sm" />
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-rose-400 text-xs font-bold py-2 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">Default Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default ShopFilters;