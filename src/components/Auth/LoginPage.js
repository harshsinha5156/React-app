
import React, { useState } from 'react';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email,
      phone: '+1 (555) 123-4567',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      profileImage: null,
    };
    
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl px-4 py-8 sm:px-8 sm:py-10">
          <div className="text-center mb-8">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your credentials to continue
            </p>
          </div>
          
          {error && (
            <div className="mb-6 text-red-500 text-center p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
            
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                  Create account
                </button>
              </p>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;