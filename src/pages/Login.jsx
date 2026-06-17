import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('https://perfume-shop-backend-one.vercel.app/api/auth/login', {
        email,
        password,
      });
      
      login(data); // Global state populate update
      navigate('/'); // Dynamic navigation
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 px-4 py-12">
      {/* Dynamic Gradient Card Container */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 max-w-md w-full shadow-2xl border-2 border-rose-400">
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 rounded-2xl p-8 w-full text-stone-100">
          
          <h2 className="text-3xl font-serif text-center mb-2 underline text-rose-400 tracking-wide">Welcome Back</h2>
          <p className="text-xs text-stone-400 text-center mb-6">Access your private fragrance gallery account.</p>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500 text-rose-400 p-3 text-xs mb-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-rose-400 font-bold mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-purple-300 border-2 border-gray-400 p-3 rounded-lg text-sm text-rose-400 focus:outline-none focus:border-purple-700 transition-colors" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-rose-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-purple-300 border-2 border-gray-400 p-3 rounded-lg text-sm text-rose-400 focus:outline-none focus:border-purple-700 transition-colors" 
                placeholder="Enter your password" 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-600 cursor-pointer hover:transition-colors hover:text-white via-purple-600 to-rose-400 text-rose-400 font-semibold text-sm tracking-wider hover:opacity-90 transition-opacity"
            >
              {loading ? 'VERIFYING CREDENTIALS...' : 'SIGN IN'}
            </button>
          </form>

          <p className="text-xs text-center text-stone-400 mt-6">
            New to Scentsation?{' '}
            <Link to="/register" className="text-rose-400 hover:underline">Create an account</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;