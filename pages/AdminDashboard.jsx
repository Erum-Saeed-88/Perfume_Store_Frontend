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




import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { 
  FaBoxOpen, FaFileInvoiceDollar, FaPlus, FaTrashCan, 
  FaPenToSquare, FaArrowUpFromBracket, FaLayerGroup, FaTags 
} from 'react-icons/fa6';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('products'); // products | orders
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  
  // 🎯 Perfume Form Attributes
  const [formData, setFormData] = useState({
    name: '', category: 'Men', volume: '100ml', price: '', description: '', stock: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get('/products');
      setProductList(data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/orders');
      setOrderList(data);
    } catch (err) {
      console.error('Error fetching orders data', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('category', formData.category);
    dataToSend.append('volume', formData.volume);
    dataToSend.append('price', formData.price);
    dataToSend.append('description', formData.description);
    dataToSend.append('stock', formData.stock);
    
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editingId) {
        await axiosInstance.put(`/products/${editingId}`, dataToSend, config);
        setMessage('✨ Perfume Updated Successfully!');
      } else {
        await axiosInstance.post('/products', dataToSend, config);
        setMessage('✨ New Luxury Scent Added!');
      }
      
      setFormData({ name: '', category: 'Men', volume: '100ml', price: '', description: '', stock: '' });
      setImageFile(null);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category || 'Men',
      volume: product.volume || '100ml',
      price: product.price,
      description: product.description,
      stock: product.stock || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this luxury fragrance from inventory?')) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        fetchProducts();
        setMessage('🗑️ Product removed successfully.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-stone-800">
      
      {/* Admin Title Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-rose-400">Aura Vault Admin Suite</h1>
          <p className="text-xs text-stone-200 bg-white/10 rounded-md p-2 mt-1 inline-block">Active Operator: {user?.name || "System Admin"}</p>
        </div>
        <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/10 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'products' ? 'bg-rose-400 text-purple-950 shadow' : 'text-white/70 hover:text-white'}`}
          >
            <FaBoxOpen /> <span>Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'orders' ? 'bg-rose-400 text-purple-950 shadow' : 'text-white/70 hover:text-white'}`}
          >
            <FaFileInvoiceDollar /> <span>Store Orders</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-purple-50 border-l-4 border-rose-400 rounded-r-xl font-bold shadow-sm text-purple-950">
          {message}
        </div>
      )}

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Add/Edit Form */}
          <div className="bg-white/90 p-6 rounded-2xl border border-purple-200 shadow-xl">
            <h2 className="text-xl font-serif font-black text-purple-900 mb-5 text-center">
              {editingId ? 'Modify Fragrance Profile' : 'Catalog New Fragrance'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Perfume Title</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Bleu De Chanel" className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-rose-400 bg-white font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-stone-300 bg-white font-bold text-stone-700">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Volume</label>
                  <select name="volume" value={formData.volume} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-stone-300 bg-white font-bold text-stone-700">
                    <option value="50ml">50 ml</option>
                    <option value="100ml">100 ml</option>
                    <option value="150ml">150 ml</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Price ($)</label>
                  <input type="number" name="price" required value={formData.price} onChange={handleInputChange} placeholder="Price" className="w-full p-3 rounded-xl border border-stone-300 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Stock Availability</label>
                  <input type="number" name="stock" required value={formData.stock} onChange={handleInputChange} placeholder="e.g. 50" className="w-full p-3 rounded-xl border border-stone-300 bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Scent Description</label>
                <textarea name="description" rows="2" required value={formData.description} onChange={handleInputChange} placeholder="Odor profile notes, top notes, base notes details..." className="w-full p-3 rounded-xl border border-stone-300 bg-white text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-purple-900 mb-1">Visual Asset</label>
                <div className="relative border-2 border-dashed border-purple-300 rounded-xl p-4 text-center hover:bg-purple-50 transition cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={!editingId} />
                  <FaArrowUpFromBracket className="text-xl text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-stone-500 block truncate">{imageFile ? imageFile.name : 'Upload product image'}</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-purple-900 to-rose-900 text-white font-bold rounded-xl hover:opacity-95 transition shadow-md disabled:opacity-50">
                {loading ? 'Synchronizing Archive...' : editingId ? 'Update Master Record' : 'Publish to Showroom'}
              </button>
            </form>
          </div>

          {/* Active Product Registry */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-serif font-black text-purple-900 flex items-center gap-2">
              <FaLayerGroup /> Vault Catalog ({productList.length})
            </h2>
            
            {productList.length === 0 ? (
              <p className="p-8 text-center bg-stone-100 rounded-2xl text-stone-500 font-bold">No product entries detected in the database.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productList.map((product) => (
                  <div key={product._id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-3 border bg-stone-50" />
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-md text-purple-900 line-clamp-1">{product.name}</h3>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md text-[10px] font-bold">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">{product.description}</p>
                      <div className="flex gap-4 text-[11px] text-stone-600 mt-2 bg-stone-50 p-2 rounded-lg font-medium">
                        <span>Volume: {product.volume}</span>
                        <span>Stock: {product.stock || '0'} left</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-3">
                      <span className="text-base font-bold text-rose-600">${product.price}</span>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(product)} className="p-2 bg-stone-100 text-purple-900 rounded-lg hover:bg-rose-400 hover:text-white transition">
                          <FaPenToSquare />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="p-2 bg-stone-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition">
                          <FaTrashCan />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        /* 📦 ORDERS TABLE (CUSTOM COD + STRIPE MULTI-ITEM INVOICING MATRIX) */
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl overflow-x-auto">
          <h2 className="text-xl font-serif font-black text-purple-900 mb-4 flex items-center gap-2">
            <FaFileInvoiceDollar /> Central Ledger Vault (Orders History)
          </h2>
          {orderList.length === 0 ? (
            <p className="p-8 text-center text-stone-400 font-semibold">No global checkout orders logged yet.</p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-gradient-to-r from-purple-900 to-rose-950 text-white text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 rounded-l-xl">Order ID</th>
                  <th className="p-4">Client Info</th>
                  <th className="p-4">Scent Package Breakdown</th>
                  <th className="p-4">Payment Node</th>
                  <th className="p-4">Gross Paid</th>
                  <th className="p-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-stone-700 divide-y divide-stone-100">
                {orderList.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50/60 transition">
                    <td className="p-4 font-mono text-[10px] text-stone-400">#{order._id?.substring(18, 24).toUpperCase()}</td>
                    <td className="p-4">
                      <p className="font-bold text-stone-900 text-sm">{order.customerName}</p>
                      <p className="text-stone-400 font-normal">{order.email}</p>
                      <p className="text-[10px] text-purple-900 bg-purple-50 rounded px-1.5 py-0.5 inline-block mt-1">
                        🏢 {order.shippingAddress?.city || order.shippingAddress}
                      </p>
                    </td>
                    <td className="p-4 max-w-[280px]">
                      {/* 🎯 NESTED ITERATION LOOP: Maps multiple cart items per order automatically */}
                      <div className="space-y-1.5">
                        {order.orderItems?.map((item, idx) => (
                          <div key={idx} className="bg-stone-50 p-1.5 rounded border border-stone-100 flex justify-between items-center">
                            <span className="font-medium text-stone-800 truncate max-w-[180px]">{item.name}</span>
                            <span className="text-rose-600 font-bold bg-white border px-1 rounded text-[10px]">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${order.paymentMethod === 'COD' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-blue-50 border-blue-300 text-blue-700'}`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-stone-900 text-sm">${order.totalPrice?.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 font-bold rounded-full text-[10px] uppercase ${order.isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid (COD)'}
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
  );
};

export default AdminDashboard;