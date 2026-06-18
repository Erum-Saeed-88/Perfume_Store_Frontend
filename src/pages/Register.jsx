import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
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
      const { data } = await axios.post('https://perfume-shop-backend-one.vercel.app/api/auth/register', {
        name,
        email,
        password,
      });
      
      login(data); // Save user to local storage and global state
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 px-4 py-12">
      {/* Dynamic Gradient Card Container */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950 max-w-md w-full">
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-rose-950/90 shadow-lg py-4 border-2 border-rose-400 rounded-2xl p-8 w-full text-stone-100">
          
          <h2 className="text-3xl font-serif text-center mb-2 text-rose-400 underline tracking-wide">Create Account</h2>
          <p className="text-xs text-stone-400 text-center mb-6">Join Scentsation & discover luxury premium aromas.</p>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500 text-rose-400 p-3 text-xs mb-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-rose-400 mb-1 font-bold">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-purple-300 border-2 border-stone-400 p-3 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-400 transition-colors" 
                placeholder="Enter your full name" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-rose-400 font-bold mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-purple-300 border-2 border-stone-400 placeholder-stone-400 p-3 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-rose-400" 
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
                className="w-full bg-purple-300 border-2 border-stone-400 p-3 rounded-lg text-sm placeholder-stone-400 text-stone-900 focus:outline-none focus:border-rose-400 transition-colors" 
                placeholder="Enter your password" 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-rose-400 text-rose-400 font-semibold text-sm tracking-wider hover:trasition-colors cursor-pointer hover:text-white"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>

          <p className="text-xs text-center text-stone-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-400 hover:underline">Login here</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;