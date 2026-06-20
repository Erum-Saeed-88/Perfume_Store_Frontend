/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaTrash, FaBoxOpen, FaDollarSign, FaTags, FaExclamationTriangle, FaCloudUploadAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', gender: 'Men', category: 'Eau De Perfume', countInStock: '', isLatest: false, description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load Inventory Vault
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://perfume-shop-backend-one.vercel.app/api/products');
      // 🎯 Safe mapping layer: checks if incoming payload is nested or clean array matrix
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Failed to stream inventory metrics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // Create Product Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!imageFile) {
        alert("🚨 Please upload an elite olfactory visual asset (Image is required).");
        return;
      }

      const dataPayload = new FormData();
      dataPayload.append('name', formData.name);
      dataPayload.append('brand', formData.brand); 
      dataPayload.append('price', formData.price);
      dataPayload.append('countInStock', formData.countInStock);
      dataPayload.append('gender', formData.gender);
      dataPayload.append('category', formData.category);
      dataPayload.append('isLatest', formData.isLatest);
      dataPayload.append('description', formData.description);
      dataPayload.append('image', imageFile); 

      // 🎯 MULTIPART ENGINE POST REQUEST
      const response = await axios.post('https://perfume-shop-backend-one.vercel.app/api/products', dataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 201 || response.data.success) {
        alert("💎 Latest Fragrance collection successfully injected into Atlas database!");
        
        setFormData({
          name: '', brand: '', price: '', gender: 'Men', category: 'Eau De Perfume', countInStock: '', isLatest: false, description: ''
        });
        setImageFile(null);
        setImagePreview(null);
        
        // Instant structural state re-validation sync
        await fetchInventory();
      }
    } catch (error) {
      console.error("Error adding product context:", error.response?.data || error.message);
      alert(`Pipeline break: ${error.response?.data?.message || "Check fields configuration"}`);
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you absolutely sure you want to remove this elixir from the store?")) {
      try {
        await axios.delete(`https://perfume-shop-backend-one.vercel.app/api/products/${id}`);
        setProducts(products.filter(item => item._id !== id));
      } catch (error) {
        console.error("Deletion lifecycle failure", error);
      }
    }
  };

  const totalItemsCount = products.length;
  const outOfStockCount = products.filter(item => item.countInStock === 0).length;
  const estimatedVaultValue = products.reduce((acc, curr) => acc + (Number(curr.price || 0) * (Number(curr.countInStock) || 0)), 0);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div>
          <h2 className="text-3xl font-serif font-bold text-rose-400 p-3 text-center tracking-wide">
            Sovereign Command Console
          </h2>
          <p className="text-xs text-center text-stone-400 tracking-widest uppercase font-light mt-1">
            Welcome back, Admin. Manage inventory distributions and product lifecycles.
          </p>
        </div>

        {/* METRICS ANALYTICS PANEL *
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

        {/* GRID STRUCTURE *
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ADD PRODUCT SECURE FORM *
          <div className="lg:col-span-5 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400 text-rose-400 p-6 rounded-2xl shadow-2xl space-y-6">
            <h3 className="text-xl font-bold tracking-wider uppercase text-rose-400 border-b border-amber-400 pb-3 text-center flex items-center justify-center gap-2">
              Add New Masterpiece
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs shadow-md p-4 rounded-xl">
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

          {/* LIVE INVENTORY DATABASE LEDGER *
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

export default AdminDashboard;*/




import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { 
  FaBoxOpen, FaFileInvoiceDollar, FaTrash, FaExclamationTriangle,
  FaPenToSquare, FaArrowUpFromBracket, FaLayerGroup, FaTags, FaDollarSign, FaCloudUploadAlt
} from 'react-icons/fa6';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('products'); // products | orders
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🎯 Unified Form Attributes
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', category: 'Eau De Perfume', gender: 'Men', stock: '', description: '', isLatest: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Deployed Backend base endpoint
  const BACKEND_URL = 'https://perfume-shop-backend-one.vercel.app/api';

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/products`);
      setProductList(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error('Error fetching products from Atlas:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/orders`);
      setOrderList(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      console.error('Error fetching matrix orders:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('brand', formData.brand);
    dataToSend.append('category', formData.category);
    dataToSend.append('price', formData.price);
    dataToSend.append('countInStock', formData.stock); // Maps back-compatibly to schema backend
    dataToSend.append('gender', formData.gender);
    dataToSend.append('isLatest', formData.isLatest);
    dataToSend.append('description', formData.description);
    
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editingId) {
        await axios.put(`${BACKEND_URL}/products/${editingId}`, dataToSend, config);
        setMessage('✨ Fragrance Record Updated Successfully!');
      } else {
        if (!imageFile) {
          alert("🚨 Graphic Asset is required to index new product.");
          setLoading(false);
          return;
        }
        await axios.post(`${BACKEND_URL}/products`, dataToSend, config);
        setMessage('✨ New Luxury Scent Registered Into Vault!');
      }
      
      setFormData({ name: '', brand: '', price: '', category: 'Eau De Perfume', gender: 'Men', stock: '', description: '', isLatest: false });
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Transaction/Pipeline broke.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      brand: product.brand || '',
      category: product.category || 'Eau De Perfume',
      gender: product.gender || 'Men',
      price: product.price,
      description: product.description,
      stock: product.countInStock || product.stock || '',
      isLatest: product.isLatest || false
    });
    setImagePreview(product.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this luxury asset from store completely?')) {
      try {
        await axios.delete(`${BACKEND_URL}/products/${id}`);
        setProductList(productList.filter(item => item._id !== id));
        setMessage('🗑️ Product purged from Atlas Node.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Live Metric Calculation layers
  const totalItemsCount = productList.length;
  const outOfStockCount = productList.filter(item => (item.countInStock === 0 || item.stock === 0)).length;
  const estimatedVaultValue = productList.reduce((acc, curr) => acc + (Number(curr.price || 0) * (Number(curr.countInStock || curr.stock || 0))), 0);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/60 text-stone-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-rose-400 p-3 text-center tracking-wide">
            Sovereign Command Console
          </h2>
          <p className="text-xs text-center text-stone-400 tracking-widest uppercase font-light mt-1">
            Active Administrator Identity: {user?.name || "System Operator"}
          </p>
        </div>

        {/* Dynamic Nav Tabs Control */}
        <div className="flex gap-4 justify-center bg-black/20 p-2 rounded-2xl max-w-sm mx-auto border border-rose-400/10">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'products' ? 'bg-rose-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-2'}`}
          >
            📦 Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-rose-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-2'}`}
          >
            📋 Store Orders ({orderList.length})
          </button>
        </div>

        {/* METRICS ANALYTICS PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400/30 p-6 rounded-2xl flex items-center justify-between shadow-md">
            <div><p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Total Vault Items</p><h3 className="text-2xl font-bold text-teal-400 mt-1">{totalItemsCount}</h3></div>
            <FaTags className="text-teal-400 text-3xl" />
          </div>
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400/30 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div><p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Out Of Stock</p><h3 className="text-2xl font-bold text-rose-500 mt-1 animate-pulse">{outOfStockCount}</h3></div>
            <FaExclamationTriangle className="text-rose-500 text-3xl" />
          </div>
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400/30 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div><p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Active Orders Logs</p><h3 className="text-2xl font-bold text-lime-400 mt-1">{orderList.length}</h3></div>
            <FaBoxOpen className="text-lime-400 text-3xl" />
          </div>
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400/30 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div><p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Inventory Asset Worth</p><h3 className="text-2xl font-bold text-amber-400 mt-1">Rs. {estimatedVaultValue.toLocaleString()}</h3></div>
            <FaDollarSign className="text-amber-400 text-3xl" />
          </div>
        </div>

        {message && (
          <div className="p-4 bg-purple-950/80 border-l-4 border-rose-400 rounded-r-xl font-bold text-rose-400 text-xs shadow-md">
            {message}
          </div>
        )}

        {activeTab === 'products' ? (
          /* ==================== PRODUCTS INTERFACE ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Add/Edit Product Form */}
            <div className="lg:col-span-5 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border-2 border-rose-400/40 text-rose-400 p-6 rounded-2xl shadow-2xl space-y-4">
              <h3 className="text-md font-bold tracking-wider uppercase text-rose-400 border-b border-amber-400/40 pb-2 text-center">
                {editingId ? 'Modify Masterpiece Context' : 'Add New Masterpiece'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Fragrance Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none" placeholder="e.g., Oud Seduction" />
                  </div>
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Brand House</label>
                    <input type="text" name="brand" required value={formData.brand} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none" placeholder="e.g., Tom Ford" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Price ($)</label>
                    <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none" placeholder="5500" />
                  </div>
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Stock Volumetric</label>
                    <input type="number" name="stock" required value={formData.stock} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none" placeholder="10" />
                  </div>
                </div>

                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Visual Asset Graphic</label>
                  <div className="relative border-2 border-dashed border-rose-400/30 rounded-xl p-4 text-center hover:bg-stone-900/40 transition cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={!editingId} />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview Matrix" className="max-h-20 mx-auto object-cover rounded-md" />
                    ) : (
                      <>
                        <FaCloudUploadAlt className="text-2xl text-stone-400 mx-auto mb-1" />
                        <span className="text-[10px] text-stone-400 block truncate">Click to shift product artwork</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Target Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none font-bold">
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Classification Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none font-bold">
                      <option value="Eau De Perfume">Eau De Perfume</option>
                      <option value="Body Spray">Body Spray</option>
                      <option value="Attar Perfume">Attar Perfume</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-stone-900/40 p-3 rounded-xl border border-stone-800/80">
                  <input type="checkbox" name="isLatest" id="isLatest" checked={formData.isLatest} onChange={handleInputChange} className="w-4 h-4 rounded text-purple-600 cursor-pointer" />
                  <label htmlFor="isLatest" className="text-stone-300 text-[11px] cursor-pointer">Mark as **Latest Premium Deployment**</label>
                </div>

                <div>
                  <label className="block text-rose-400 font-bold uppercase tracking-wider mb-1">Olfactory Profile Logs</label>
                  <textarea name="description" rows="2" value={formData.description} onChange={handleInputChange} className="w-full bg-stone-200 p-3 rounded-xl text-stone-800 focus:outline-none resize-none" placeholder="Top notes of bergamot, heart lines..." />
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950 font-bold border-2 border-rose-400 text-rose-400 tracking-widest uppercase hover:opacity-90 transition shadow-lg cursor-pointer text-xs rounded-xl">
                  {loading ? 'Processing Transaction System Sync...' : editingId ? 'Update Master Record' : 'Publish Core To Showroom'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', brand: '', price: '', category: 'Eau De Perfume', gender: 'Men', stock: '', description: '', isLatest: false }); setImagePreview(null); }} className="w-full py-1.5 bg-red-950/40 border border-red-500/30 text-red-400 font-bold rounded-xl text-xs">
                    Cancel Core Overwrite
                  </button>
                )}
              </form>
            </div>

            {/* Inventory Ledger View */}
            <div className="lg:col-span-7 bg-gradient-to-r from-blue-800 via-purple-900 to-rose-950/60 border border-rose-400/40 text-rose-400 p-6 rounded-2xl shadow-2xl space-y-4">
              <h3 className="text-md font-bold tracking-wider uppercase text-center text-rose-400 border-b border-amber-400/40 pb-2">Live Store Ledger</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-amber-400/40 text-rose-400 font-bold uppercase tracking-wider">
                      <th className="pb-3">Perfume Detail</th>
                      <th className="pb-3">Classification</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3 text-center">Stock</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/40 text-stone-300">
                    {productList.map((item) => (
                      <tr key={item._id} className="hover:bg-stone-950/40 transition-colors">
                        <td className="py-3 pr-2 flex items-center gap-3">
                          <img src={item.image} alt="" className="w-8 h-8 rounded object-cover bg-stone-950 border border-stone-800" />
                          <div className="flex flex-col">
                            <span className="font-serif font-bold text-stone-100 line-clamp-1 max-w-[120px]">{item.name}</span>
                            <span className="text-[10px] text-amber-500/80 italic">by {item.brand || 'House'}</span>
                          </div>
                        </td>
                        <td className="py-3 text-stone-400">{item.gender} &bull; {item.category}</td>
                        <td className="py-3 font-medium text-amber-400">Rs. {item.price?.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-mono ${(item.countInStock === 0 || item.stock === 0) ? 'text-rose-400 bg-red-950' : 'bg-stone-900 text-stone-300'}`}>
                            {item.countInStock ?? item.stock}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <button onClick={() => handleEdit(item)} className="text-stone-400 hover:text-rose-400 cursor-pointer transition-colors"><FaPenToSquare /></button>
                          <button onClick={() => handleDelete(item._id)} className="text-stone-500 hover:text-red-400 cursor-pointer transition-colors"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          /* ==================== 📦 STORE ORDERS VIEW MATRIX ==================== */
          <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/50 p-6 rounded-2xl border border-rose-400/30 shadow-xl overflow-x-auto">
            <h2 className="text-lg font-serif font-bold text-rose-400 mb-6 tracking-wide flex items-center gap-2">
              <FaFileInvoiceDollar /> Ledger Transaction Logs Base
            </h2>
            {orderList.length === 0 ? (
              <p className="p-8 text-center text-stone-400 font-semibold">No core checkout orders logged yet.</p>
            ) : (
              <table className="w-full text-left border-collapse min-w-[750px] text-xs">
                <thead>
                  <tr className="border-b border-rose-400/30 text-rose-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Client Registry</th>
                    <th className="p-4">Scent Manifest Items</th>
                    <th className="p-4">Payment Node</th>
                    <th className="p-4">Gross Paid</th>
                    <th className="p-4">Logistical Status</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-stone-300 divide-y divide-purple-900/30">
                  {orderList.map((order) => (
                    <tr key={order._id} className="hover:bg-purple-900/20 transition-colors">
                      <td className="p-4 font-mono text-[10px] text-stone-400">#{order._id?.substring(18, 24).toUpperCase()}</td>
                      <td className="p-4">
                        <p className="font-bold text-stone-100 text-sm">{order.customerName}</p>
                        <p className="text-stone-400 font-normal">{order.email}</p>
                        <p className="text-[10px] text-rose-300 mt-1">
                          📍 {order.shippingAddress?.city || order.shippingAddress?.address || JSON.stringify(order.shippingAddress)}
                        </p>
                      </td>
                      <td className="p-4 max-w-[280px]">
                        <div className="space-y-1.5">
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="bg-purple-950/40 p-1.5 rounded border border-rose-400/10 flex justify-between items-center">
                              <span className="font-medium text-stone-300 truncate max-w-[180px]">{item.name}</span>
                              <span className="text-amber-400 font-bold text-[10px] bg-black/20 px-1 rounded">x{item.quantity ?? item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase border ${order.paymentMethod === 'COD' ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-blue-400/10 border-blue-400/30 text-blue-400'}`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-amber-400 text-sm">Rs. {order.totalPrice?.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase border ${order.isPaid ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'}`}>
                          {order.isPaid ? 'Settled (Paid)' : 'Unpaid (COD)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;