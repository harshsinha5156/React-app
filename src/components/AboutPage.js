import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About ShopEase</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted e-commerce partner since 2015, dedicated to providing quality products and exceptional service.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Our Story */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-3">
            Founded in 2015, ShopEase began as a small startup with a mission to simplify online shopping. 
            Today, we serve millions of customers worldwide while maintaining our commitment to quality and service.
          </p>
          <p className="text-gray-600">
            We've carefully curated collections across electronics, fashion, home goods, and more - always 
            focusing on your needs and satisfaction.
          </p>
        </div>
        
        {/* Our Values */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="font-semibold text-lg text-gray-700">Quality Assurance</h3>
              <p className="text-gray-600">Every product undergoes rigorous quality checks</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg text-gray-700">Customer First</h3>
              <p className="text-gray-600">24/7 support and hassle-free returns</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg text-gray-700">Fast Delivery</h3>
              <p className="text-gray-600">90% of orders arrive within 2 business days</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg text-gray-700">Secure Shopping</h3>
              <p className="text-gray-600">Bank-level security for all transactions</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-indigo-600">10M+</p>
            <p className="text-gray-600">Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">500K+</p>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">150+</p>
            <p className="text-gray-600">Brands</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="text-center bg-indigo-50 rounded-xl p-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to You</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          At ShopEase, we're constantly innovating to bring you the best shopping experience. 
          From our eco-friendly packaging initiatives to our price match guarantee, we put you first in everything we do.
        </p>
        <div className="mt-8">
          <p className="text-lg font-medium text-gray-700">
            Thank you for making us your trusted shopping partner
          </p>
          <div className="mt-4 h-1 w-20 bg-indigo-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;