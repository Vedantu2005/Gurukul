import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader } from 'lucide-react';

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Default credentials
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'Admin123!';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setIsAdminLoggedIn(true);
        localStorage.setItem('adminToken', 'token_' + Date.now());
        navigate('/admin/blog');
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8D8C4] via-[#C7B7A3] to-[#6D2932]">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-[#E8D8C4] via-[#C7B7A3] to-[#6D2932] p-3 rounded-lg mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600 text-sm">Betting Platform Administration</p>
        </div>

        <form onSubmit={handleLogin} className="mb-6">
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold text-sm mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#561C24] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-700 font-semibold text-sm mb-3">Demo Credentials:</p>
          <p className="text-[#561C24] font-mono text-xs mb-1">Email: admin@gmail.com</p>
          <p className="text-[#561C24] font-mono text-xs">Password: Admin123!</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;