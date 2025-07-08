// // src/components/ProductsPage.js

// import React from 'react';
// import ProductGrid from './ProductGrid';

// const ProductsPage = ({ 
//   products, 
//   wishlist, 
//   toggleWishlist, 
//   addToCart, 
//   isLoading, 
//   openQuickView, 
//   selectedCategory, 
//   navigateTo 
// }) => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           {selectedCategory ? `${selectedCategory} Collection` : "Discover Our Products"}
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           {selectedCategory 
//             ? `Premium ${selectedCategory} selection` 
//             : "Explore our premium collection across multiple categories"}
//         </p>

//         {selectedCategory && (
//           <button
//             className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
//             onClick={() => navigateTo('products')}
//           >
//             &larr; View All Categories
//           </button>
//         )}
//       </div>
      
//       <ProductGrid 
//         products={products} 
//         wishlist={wishlist} 
//         toggleWishlist={toggleWishlist}
//         addToCart={addToCart}
//         isLoading={isLoading}
//         openQuickView={openQuickView}
//         category={selectedCategory}
//       />
//     </div>
//   );
// };

// export default ProductsPage;



// components/ProductsPage.jsx
import React, { useState, useEffect } from 'react';

const ProductsPage = ({ 
  products, 
  wishlist, 
  toggleWishlist, 
  addToCart, 
  isLoading, 
  openQuickView,
  navigateTo,
  selectedCategory
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
  });
  
  const [sortOption, setSortOption] = useState('default');
  
  // Get all unique categories from products
  const allCategories = [...new Set(products.map(p => p.category))];
  
  // Calculate min and max prices
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Initialize filters when products load
  useEffect(() => {
    if (products.length > 0) {
      setFilters({
        categories: selectedCategory ? [selectedCategory] : allCategories,
        priceRange: [minPrice, maxPrice]
      });
    }
  }, [products, selectedCategory]);
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };
  
  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };
  
  // Handle min price input
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      priceRange: [value, prev.priceRange[1]]
    }));
  };
  
  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Filter and sort products
  const filteredProducts = products
    .filter(p => 
      filters.categories.includes(p.category) && 
      p.price >= filters.priceRange[0] && 
      p.price <= filters.priceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      return a.id - b.id; // Default sort by ID
    });
    
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categories: allCategories,
      priceRange: [minPrice, maxPrice]
    });
    setSortOption('default');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={resetFilters}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Reset All
            </button>
          </div>
          
          {/* Price filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-600">${filters.priceRange[0]}</span>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-600">${filters.priceRange[1]}</span>
            </div>
            
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full p-2 border rounded"
                placeholder="Min price"
              />
              <input
                type="number"
                min={filters.priceRange[0]}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value) || maxPrice]
                }))}
                className="w-full p-2 border rounded"
                placeholder="Max price"
              />
            </div>
          </div>
          
          {/* Category filter */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {allCategories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2 h-4 w-4 text-indigo-600 rounded"
                  />
                  <label htmlFor={`category-${category}`} className="text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            
            <div className="flex items-center gap-3">
              <label className="text-gray-700">Sort by:</label>
              <select 
                value={sortOption} 
                onChange={handleSortChange}
                className="border rounded-md p-2 text-gray-700"
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters</p>
              <button 
                className="bg-indigo-600 text-white px-6 py-2 rounded-md"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-gray-200 bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                    onClick={() => openQuickView(product)}
                  >
                    <button 
                      className={`m-2 p-2 rounded-full ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={wishlist.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.title}</h3>
                        <p className="text-indigo-700 font-bold">${product.price.toFixed(2)}</p>
                        <div className="flex items-center mt-1">
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
                          <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
                        </div>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                        onClick={() => openQuickView(product)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;