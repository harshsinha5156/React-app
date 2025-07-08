// import React, { useState, useEffect } from 'react';
// import { FaTimes, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

// const QuickViewModal = ({ product, onClose, isWishlisted, toggleWishlist, addToCart, onViewFullDetails }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [maxQuantity, setMaxQuantity] = useState(10); // Default max
  
//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   // Initialize quantity and max based on stock
//   useEffect(() => {
//     setQuantity(1);
//     setMaxQuantity(product.stock > 0 ? Math.min(product.stock, 10) : 10);
//   }, [product]);

//   // Handle quantity changes
//   const incrementQuantity = () => {
//     setQuantity(prev => Math.min(prev + 1, maxQuantity));
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => Math.max(prev - 1, 1));
//   };

//   // Stock status
//   const stockStatus = product.stock > 10 
//     ? <span className="text-green-600 font-medium">In Stock</span>
//     : product.stock > 0 
//       ? <span className="text-orange-500 font-medium">Only {product.stock} left</span>
//       : <span className="text-red-600 font-medium">Out of Stock</span>;

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
//         onClick={handleModalClick}
//       >
//         <div className="relative">
//           <button 
//             className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
//             onClick={onClose}
//           >
//             <FaTimes />
//           </button>
          
//           <div className="md:flex">
//             {/* Product Image */}
//             <div className="md:w-1/2 p-6">
//               <div className="h-80 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
//                 {product.imageUrl ? (
//                   <img 
//                     src={product.imageUrl} 
//                     alt={product.title} 
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <div className="text-gray-400">No image available</div>
//                 )}
//               </div>
              
//               <div className="flex mt-4 space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div 
//                     key={i} 
//                     className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden"
//                   >
//                     {product.imageUrl && (
//                       <img 
//                         src={product.imageUrl} 
//                         alt={`${product.title} thumbnail ${i}`} 
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Product Details */}
//             <div className="md:w-1/2 p-6">
//               <div className="flex justify-between items-start">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
//                 <button 
//                   className={`p-2 rounded-full ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-100 hover:text-red-500`}
//                   onClick={toggleWishlist}
//                 >
//                   <FaHeart className={isWishlisted ? "fill-current" : ""} />
//                 </button>
//               </div>
              
//               <div className="flex items-center mb-4">
//                 <div className="flex text-yellow-400 mr-2">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar 
//                       key={i} 
//                       className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600">({product.rating})</span>
//               </div>
              
//               <div className="mb-6">
//                 <span className="text-3xl font-bold text-indigo-700">${product.price.toFixed(2)}</span>
//                 <span className="text-gray-500 ml-2 line-through">${(product.price * 1.2).toFixed(2)}</span>
//                 <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Save 20%</span>
//               </div>
              
//               <p className="text-gray-700 mb-6">{product.description}</p>
              
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
//                 <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//                   <li className="flex">
//                     <span className="font-medium w-24">Category:</span>
//                     <span>{product.category}</span>
//                   </li>
//                   <li className="flex">
//                     <span className="font-medium w-24">Availability:</span>
//                     <span>{stockStatus}</span>
//                   </li>
//                   <li className="flex">
//                     <span className="font-medium w-24">Brand:</span>
//                     <span>Premium Brand</span>
//                   </li>
//                   <li className="flex">
//                     <span className="font-medium w-24">SKU:</span>
//                     <span>PRD-{product.id.toString().padStart(3, '0')}</span>
//                   </li>
//                 </ul>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center border border-gray-300 rounded">
//                   <button 
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={decrementQuantity}
//                     disabled={quantity <= 1}
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2">{quantity}</span>
//                   <button 
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={incrementQuantity}
//                     disabled={quantity >= maxQuantity}
//                   >
//                     +
//                   </button>
//                 </div>
                
//                 <button 
//                   className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
//                   onClick={() => {
//                     addToCart(product, quantity);
//                     onClose();
//                   }}
//                   disabled={product.stock === 0}
//                 >
//                   <FaShoppingCart className="mr-2" />
//                   Add to Cart
//                 </button>
//               </div>
              
//               <button 
//       className="w-full mt-4 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
//       onClick={() => {
//         onViewFullDetails(product);
//         onClose();
//       }}
//     >
//       View Full Product Details
//     </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickViewModal;


import React, { useState, useEffect } from 'react';
import { FaTimes, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const QuickViewModal = ({ 
  product, 
  onClose, 
  isWishlisted, 
  toggleWishlist, 
  addToCart,
  onViewFullDetails
}) => {
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(10);
  
  // Initialize quantity and max based on stock
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setMaxQuantity(product.stock > 0 ? Math.min(product.stock, 10) : 10);
    }
  }, [product]);

  if (!product) return null;

  // Handle quantity changes
  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  // Stock status
  const stockStatus = product.stock > 10 
    ? <span className="text-green-600 font-medium">In Stock</span>
    : product.stock > 0 
      ? <span className="text-orange-500 font-medium">Only {product.stock} left</span>
      : <span className="text-red-600 font-medium">Out of Stock</span>;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-modal p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
            onClick={onClose}
          >
            <FaTimes />
          </button>
          
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="h-80 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
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
              
              <div className="flex mt-4 space-x-2">
                {/* Using the same image for all thumbnails since we don't have multiple images */}
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={`${product.title} thumbnail ${i}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs">No image</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
                <button 
                  className={`p-2 rounded-full ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-100 hover:text-red-500`}
                  onClick={toggleWishlist}
                >
                  <FaHeart className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>
              
              <div className="flex items-center mb-4">
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
              
              <div className="flex items-center space-x-4">
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
                    addToCart(product);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
              
              <button 
                className="w-full mt-4 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                onClick={() => {
                  onViewFullDetails(product);
                  onClose();
                }}
              >
                View Full Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;