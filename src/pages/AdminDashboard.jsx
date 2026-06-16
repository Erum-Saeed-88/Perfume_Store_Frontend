import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaTrash, FaBoxOpen, FaDollarSign, FaTags, FaExclamationTriangle, FaCloudUploadAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  // Main Products & Analytics States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ⚡ Add Product Form State (🎯 FIXED: Added 'brand' key into initial state configuration)
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', gender: 'Men', category: 'Eau De Perfume', countInStock: '', isLatest: false, description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 1. Load Inventory Vault
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:8000/api/products');
      setProducts(data);
    } catch (error) {
      console.error("Failed to stream inventory metrics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. Input Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Image Input Selector Matrix
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Safe temporary browser preview
    }
  };

  // 3. Create Product Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!imageFile) {
        console.log("🚨 Please upload an elite olfactory visual asset (Image is required).");
        return;
      }

      // 📦 Packaging data vectors into browser FormData object
      const dataPayload = new FormData();
      dataPayload.append('name', formData.name);
      dataPayload.append('brand', formData.brand); // 🎯 FIXED: Appended brand metadata vectors to multipart transmission payload
      dataPayload.append('price', formData.price);
      dataPayload.append('countInStock', formData.countInStock);
      dataPayload.append('gender', formData.gender);
      dataPayload.append('category', formData.category);
      dataPayload.append('isLatest', formData.isLatest);
      dataPayload.append('description', formData.description);
      dataPayload.append('image', imageFile); // Triggers upload.single('image') on backend

      // Direct post transmission with Multipart boundaries
      await axios.post('http://localhost:8000/api/products', dataPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("💎 Latest Fragrance collection successfully injected into the database vault!");
      
      // Reset Form Fields & States cleanly
      setFormData({
        name: '', brand: '', price: '', gender: 'Men', category: 'Eau De Perfume', countInStock: '', isLatest: false, description: ''
      });
      setImageFile(null);
      setImagePreview(null);
      
      // Refresh dynamic ledger
      fetchInventory();
    } catch (error) {
      console.log("Error adding product. Check backend terminal logs.");
      console.error(error);
    }
  };

  // 4. Delete Product Handler
  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you absolutely sure you want to remove this elixir from the store?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter(item => item._id !== id));
      } catch (error) {
        console.error("Deletion lifecycle failure", error);
      }
    }
  };

  // 5. Computed Analytics Metrics for Admin Overview
  const totalItemsCount = products.length;
  const outOfStockCount = products.filter(item => item.countInStock === 0).length;
  const estimatedVaultValue = products.reduce((acc, curr) => acc + (Number(curr.price || 0) * (Number(curr.countInStock) || 0)), 0);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Branding Desk */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-rose-400 p-3 text-center tracking-wide">
            Sovereign Command Console
          </h2>
          <p className="text-xs text-center text-stone-400 tracking-widest uppercase font-light mt-1">
            Welcome back, Admin. Manage inventory distributions and product lifecycles.
          </p>
        </div>

        {/* 📊 SECTION 1: METRICS ANALYTICS PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-6 rounded-2xl flex items-center justify-between shadow-md">
            <div>
              <p className="text-[15px] text-stone-400 tracking-widest font-bold">Total Vault Items</p>
              <h3 className="text-2xl font-bold text-teal-400 mt-1 font-sans">{totalItemsCount}</h3>
            </div>
            <FaTags className="text-teal-400 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[15px] text-stone-400 uppercase tracking-widest font-medium">Out Of Stock</p>
              <h3 className="text-3xl font-bold text-rose-500 mt-1 font-sans animate-pulse">{outOfStockCount}</h3>
            </div>
            <FaExclamationTriangle className="text-rose-500 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[15px] text-stone-400 uppercase tracking-widest font-medium">Active Orders</p>
              <h3 className="text-2xl font-bold text-lime-400 mt-1 font-sans">12</h3>
            </div>
            <FaBoxOpen className="text-lime-400 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[15px] text-stone-400 uppercase tracking-widest font-medium">Inventory Worth</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1 font-sans animate-pulse">Rs. {estimatedVaultValue.toLocaleString()}</h3>
            </div>
            <FaDollarSign className="text-amber-400 text-3xl" />
          </div>
        </div>

        {/* SECTION 2: GRID CORE split FOR INJECTION & LISTING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER: ADD PRODUCT SECURE FORM (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 text-rose-400 p-6 rounded-2xl shadow-2xl space-y-6">
            <h3 className="text-xl font-bold tracking-wider uppercase text-rose-400 border-b border-amber-400 pb-3 text-center flex items-center justify-center gap-2">
              Add New Masterpiece
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs shadow-md p-4 rounded-xl">
              {/* 🎯 FIXED: Made Name and Brand inputs dynamic side-by-side inside a grid element */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Fragrance Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400" placeholder="e.g., Oud Seduction" />
                </div>
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Brand House</label>
                  <input type="text" name="brand" required value={formData.brand} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400" placeholder="e.g., Tom Ford" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Price ($)</label>
                  <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full bg-stone-200 border border-stone-800 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400" placeholder="5500" />
                </div>
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Initial Stock</label>
                  <input type="number" name="countInStock" required value={formData.countInStock} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400" placeholder="10" />
                </div>
              </div>

              {/* Real Premium File Upload System */}
              <div>
                <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Bottle Essence Graphic</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-600 rounded-xl cursor-pointer bg-stone-900/40 hover:bg-stone-900/60 transition-colors relative overflow-hidden group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Vault Preview" className="w-full h-full object-contain absolute inset-0 z-10 p-2" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="text-3xl text-stone-400 group-hover:text-rose-400 transition-colors mb-1" />
                        <p className="text-[11px] text-stone-400 font-medium">Click to upload bottle image</p>
                        <p className="text-[9px] text-stone-500 mt-0.5">PNG, JPG, WEBP (Max 5MB)</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Target Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400">
                    <option value="Body Spray">Body Spray</option>
                    <option value="Eau De Perfume">Eau De Perfume</option>
                    <option value="Attar Perfume">Attar Perfume</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-stone-900/40 p-3 rounded-xl border border-stone-800/80">
                <input type="checkbox" name="isLatest" id="isLatest" checked={formData.isLatest} onChange={handleInputChange} className="w-4 h-4 rounded text-purple-600 bg-stone-800 border-stone-700 cursor-pointer focus:ring-0" />
                <label htmlFor="isLatest" className="text-stone-300 text-[11px] font-light cursor-pointer select-none">Mark as **Latest Collection Item**</label>
              </div>

              <div>
                <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Olfactory Description</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none focus:border-rose-400 resize-none" placeholder="Top notes of bergamot, heart lines of vanilla rose..."></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950 font-bold border-2 border-rose-400 text-rose-400 tracking-widest uppercase hover:opacity-95 transition-opacity shadow-lg cursor-pointer text-sm">
                Publish To Store
              </button>
            </form>
          </div>

          {/* RIGHT CONTAINER: LIVE INVENTORY DATABASE LEDGER (7 Columns) */}
          <div className="lg:col-span-7 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border border-rose-400 text-rose-400 p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-xl font-bold tracking-wider uppercase text-center text-rose-400 border-b border-amber-400 pb-3">
              Live Store Ledger
            </h3>

            {loading ? (
              <p className="text-center py-10 text-stone-500 animate-pulse">Syncing dynamic catalog matrix...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-10 text-stone-500">No fluid entries located in database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-amber-400 text-rose-400 font-bold uppercase tracking-wider">
                      <th className="pb-3">Perfume Detail</th>
                      <th className="pb-3">Classification</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3 text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/40 text-stone-300">
                    {products.map((item) => (
                      <tr key={item._id} className="group hover:bg-stone-950/40 transition-colors">
                        <td className="py-3 pr-2 flex items-center gap-3">
                          <img src={item.image || null} alt="" className="w-8 h-8 rounded object-cover bg-stone-950 border border-stone-800" />
                          {/* 🎯 FIXED: Wrapped layout inside a column flex box and injected a sleek brand tracking indicator right under the perfume name */}
                          <div className="flex flex-col">
                            <span className="font-serif font-medium text-stone-100 line-clamp-1 max-w-[120px]" title={item.name}>{item.name}</span>
                            {item.brand && <span className="text-[10px] text-amber-500/80 font-medium italic mt-0.5">by {item.brand}</span>}
                          </div>
                        </td>
                        <td className="py-3 text-stone-400">
                          {item.gender} &bull; <span className="text-[10px]">{item.category}</span>
                        </td>
                        <td className="py-3 font-sans font-medium text-amber-400">Rs. {item.price?.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-mono ${item.countInStock === 0 ? 'text-rose-400 bg-red-950 border border-red-900/30' : 'bg-stone-900 text-stone-300'}`}>
                            {item.countInStock}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button onClick={() => deleteProductHandler(item._id)} className="text-stone-500 cursor-pointer hover:text-red-400 p-2 transition-colors">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;