
import React, { useState } from 'react';
import { FaHeart, FaEye, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, isWishlisted, toggleWishlist, onQuickView, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Stock status
  const stockStatus = product.stock > 10 
    ? <span className="text-green-600">In Stock</span>
    : product.stock > 0 
      ? <span className="text-orange-500">Only {product.stock} left</span>
      : <span className="text-red-600">Out of Stock</span>;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <div className="h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
          
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-4">
              <button 
                className="bg-white rounded-full p-3 shadow-lg hover:bg-indigo-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
              >
                <FaEye className="text-gray-700" />
              </button>
              <button 
                className="bg-white rounded-full p-3 shadow-lg hover:bg-indigo-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
              >
                <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-700"} />
              </button>
            </div>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 right-2 p-2 rounded-full ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-white text-gray-500'} shadow-md hover:bg-red-100 hover:text-red-500 transition-colors`}
          onClick={() => toggleWishlist(product.id)}
        >
          <FaHeart className={isWishlisted ? "fill-current" : ""} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{product.title}</h3>
          <span className="font-bold text-indigo-700 text-lg">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{stockStatus}</span>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors disabled:opacity-50"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <FaShoppingCart className="mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;