
import React from 'react';
import ProductCard from './ProductCard';
import { FaShippingFast, FaHeadset, FaShieldAlt, FaTags } from 'react-icons/fa';

const HomePage = ({ products, wishlist, toggleWishlist, addToCart, navigateTo, openQuickView }) => {
  // Filter featured products
  const featuredProducts = products.filter(product => product.isFeatured);
  
  // Categories data
  const categories = [
    { id: 1, name: "Electronics", count: 24, image: "electronics" },
    { id: 2, name: "Home & Kitchen", count: 18, image: "home" },
    { id: 3, name: "Fashion", count: 32, image: "fashion" },
    { id: 4, name: "Beauty", count: 15, image: "beauty" },
  ];
  
  // Benefits data
  const benefits = [
    { id: 1, icon: <FaShippingFast className="text-3xl text-indigo-600" />, title: "Free Shipping", description: "On all orders over $99" },
    { id: 2, icon: <FaHeadset className="text-3xl text-indigo-600" />, title: "24/7 Support", description: "Dedicated customer support" },
    { id: 3, icon: <FaShieldAlt className="text-3xl text-indigo-600" />, title: "Secure Payments", description: "100% secure payment methods" },
    { id: 4, icon: <FaTags className="text-3xl text-indigo-600" />, title: "Daily Offers", description: "Discounts up to 70% off" },
  ];
  
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Summer Sale is Live!</h1>
            <p className="text-xl md:text-2xl mb-8">Up to 50% off on all new arrivals. Limited time offer.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-100 transition-colors"
                onClick={() => navigateTo('products')}
              >
                Shop Now
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-indigo-700 transition-colors">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse through our diverse range of product categories</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => navigateTo('products')}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="bg-gray-300 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                onQuickView={openQuickView}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              onClick={() => navigateTo('products')}
            >
              View All Products
            </button>
          </div>
        </div>
      </div>
      
      {/* Special Offers Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Get 30% off on all electronics this week only. Use code: TECH30</p>
          <div className="flex justify-center">
            <div className="bg-white text-orange-600 font-bold py-2 px-6 rounded-full text-lg">
              Ends in: 02d 12h 45m
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(benefit => (
            <div key={benefit.id} className="text-center">
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      
      {/* Newsletter */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Get the latest updates on new products and upcoming sales</p>
          
          <div className="max-w-xl mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;