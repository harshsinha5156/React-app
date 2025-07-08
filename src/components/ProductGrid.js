
// import React, { useState } from 'react';
// import ProductCard from './ProductCard';
// import QuickViewModal from './QuickViewModal';

// const ProductGrid = ({ products, wishlist, toggleWishlist, addToCart, isLoading, openQuickView }) => {
//   const [filter, setFilter] = useState('all');
  
//   const categories = ['all', ...new Set(products.map(p => p.category))];
  
//   const filteredProducts = filter === 'all' 
//     ? products 
//     : products.filter(p => p.category === filter);

//   return (
//     <div className="mb-16">
//       {/* Filter Controls */}
//       <div className="flex flex-wrap gap-2 mb-8 justify-center">
//         {categories.map(category => (
//           <button
//             key={category}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               filter === category
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//             onClick={() => setFilter(category)}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>
      
//       {/* Product Grid */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map(product => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               isWishlisted={wishlist.includes(product.id)}
//               toggleWishlist={toggleWishlist}
//               addToCart={addToCart}
//               onQuickView={openQuickView}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;


import React from 'react';

const ProductGrid = ({ 
  products, 
  wishlist, 
  toggleWishlist, 
  addToCart, 
  isLoading, 
  openQuickView,
  category 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Filter by category if provided
  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try another category or search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-xl">
          <div className="relative">
            <div className="h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
            
            <button 
              className={`absolute top-3 right-3 p-2 rounded-full ${
                wishlist.includes(product.id) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-500'
              } shadow-md`}
              onClick={() => toggleWishlist(product.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                Only {product.stock} left
              </div>
            )}
            
            {product.stock === 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.category}</p>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm ml-1">({product.rating})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
              <button 
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
            
            {/* <button 
              className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
              onClick={() => openQuickView(product)}
            >
              Quick View
            </button> */}

            <button 
              className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
              onClick={() => openQuickView(product)}
            >
             Quick View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;