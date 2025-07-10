
import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';

const ProductDetailPage = ({ product, onNavigate, wishlist, toggleWishlist, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setMaxQuantity(product.stock > 0 ? Math.min(product.stock, 10) : 10);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [product]);

  // If no product, show loading state
  if (!product || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // Stock status
  const stockStatus = product.stock > 10 
    ? <span className="text-green-600 font-medium">In Stock</span>
    : product.stock > 0 
      ? <span className="text-orange-500 font-medium">Only {product.stock} left</span>
      : <span className="text-red-600 font-medium">Out of Stock</span>;

  // Handle quantity changes
  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800"
        onClick={() => onNavigate('products')}
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </button>

      <div className="md:flex gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="h-96 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentNode.innerHTML = '<div className="text-gray-400 p-4">Image not available</div>';
                }}
              />
            ) : (
              <div className="text-gray-400 p-4">No image available</div>
            )}
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={`${product.title} thumbnail ${i}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-xs p-2">No image</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <button 
              className={`p-2 rounded-full ${wishlist.includes(product.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-100 hover:text-red-500`}
              onClick={() => toggleWishlist(product.id)}
            >
              <FaHeart className={wishlist.includes(product.id) ? "fill-current" : ""} />
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-indigo-700">${product.price.toFixed(2)}</span>
            <span className="text-gray-500 ml-2 line-through">${(product.price * 1.2).toFixed(2)}</span>
            <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Save 20%</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <li className="flex">
                <span className="font-medium w-24">Category:</span>
                <span>{product.category}</span>
              </li>
              <li className="flex">
                <span className="font-medium w-24">Availability:</span>
                <span>{stockStatus}</span>
              </li>
              <li className="flex">
                <span className="font-medium w-24">Brand:</span>
                <span>Premium Brand</span>
              </li>
              <li className="flex">
                <span className="font-medium w-24">SKU:</span>
                <span>PRD-{product.id.toString().padStart(3, '0')}</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={incrementQuantity}
                disabled={quantity >= maxQuantity}
              >
                +
              </button>
            </div>

            <button 
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
              onClick={() => {
                addToCart({...product}, quantity);
              }}
              disabled={product.stock === 0}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4">
                <h3 className="font-semibold">Alex Johnson</h3>
                <div className="flex text-yellow-400">
                  <FaStar className="fill-current" />
                  <FaStar className="fill-current" />
                  <FaStar className="fill-current" />
                  <FaStar className="fill-current" />
                  <FaStar className="fill-current" />
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "This product exceeded my expectations! The quality is outstanding and it arrived sooner than expected."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
