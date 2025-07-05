
import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ wishlistCount, cartCount, onCartClick, onNavigate, activePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    "Electronics", 
    "Home & Kitchen", 
    "Fashion", 
    "Beauty", 
    "Sports", 
    "Books"
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-indigo-700 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            Shop<span className="text-orange-500">Ease</span>
          </div>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative text-gray-600 hover:text-indigo-600"
              onClick={() => handleNavigation('wishlist')}
            >
              <FaHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              className="relative text-gray-600 hover:text-indigo-600"
              onClick={onCartClick}
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => handleNavigation('account')}
            >
              <FaUser size={20} />
            </button>
            
            <button 
              className="md:hidden text-gray-600 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className={`md:flex ${mobileMenuOpen ? 'block' : 'hidden'} py-2 border-t border-gray-200`}>
          <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <button 
                className={`${activePage === 'home' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
                onClick={() => handleNavigation('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`${activePage === 'products' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
                onClick={() => handleNavigation('products')}
              >
                Products
              </button>
            </li>
            <li className="relative group">
              <button className="flex items-center text-gray-600 hover:text-indigo-700">
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-48 mt-2 z-10">
                {categories.map((category, index) => (
                  <button 
                    key={index} 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded w-full text-left"
                    onClick={() => {
                      
                      alert(`Filtering by category: ${category}`);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </li>
            <li>
              <button 
                className={`${activePage === 'about' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
                onClick={() => handleNavigation('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className={`${activePage === 'contact' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
                onClick={() => handleNavigation('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;