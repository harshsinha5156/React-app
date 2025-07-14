
import React, { useState } from "react";

const HomePage = ({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
  navigateTo,
  openQuickView,
  filteredProducts, setSearchTerm, searchTerm 
}) => {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Categories data
  const categories = [
    {
      name: "Electronics",
      imageUrl:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Electronics").length,
    },
    {
      name: "Home & Kitchen",
      imageUrl:
        "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Home & Kitchen").length,
    },
    {
      name: "Furniture",
      imageUrl:
        "https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Furniture").length,
    },
    {
      name: "Beauty & Health",
      imageUrl:
        "https://images.pexels.com/photos/4047077/pexels-photo-4047077.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Beauty & Health").length,
    },
    {
      name: "Sports",
      imageUrl:
        "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Sports").length,
    },
    {
      name: "Fashion",
      imageUrl:
        "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: products.filter((p) => p.category === "Fashion").length,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  

  // Calculate current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
  
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubscribed(true);
      setEmail('');
      
      
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 my-6 sm:my-12 text-white text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Premium Products for Every Lifestyle
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto">
          Discover our carefully curated collection of high-quality products
          designed to enhance your daily life.
        </p>
        <button
          className="bg-white text-indigo-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base hover:bg-gray-100 transition-colors"
          onClick={() => navigateTo("products")}
        >
          Shop Now
        </button>
      </div>

      

      {/* Categories Section */}
      <section className="my-10 sm:my-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden cursor-pointer transform transition hover:scale-[1.02] sm:hover:scale-[1.03]"
              onClick={() => navigateTo("products", { category: category.name })}
            >
              <div className="h-20 sm:h-24 md:h-28 bg-gray-200 flex items-center justify-center">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="font-medium sm:font-semibold text-sm sm:text-base text-gray-800 truncate">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {category.count} products
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="my-10 sm:my-16">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our handpicked selection of premium products
          </p>
        </div>

        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any products matching your search. Try different keywords.
            </p>
            <button
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm sm:shadow-md overflow-hidden transition-transform hover:shadow-lg"
                >
                  <div className="relative">
                    <div className="h-40 sm:h-48 md:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-contain p-2 sm:p-4"
                        />
                      ) : (
                        <div className="text-gray-400">No image available</div>
                      )}
                    </div>

                    <button
                      className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full ${
                        wishlist.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-500"
                      } shadow-sm sm:shadow-md`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {product.stock <= 0 && product.stock > 0 && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-1.5 py-1 rounded">
                        Only {product.stock} left
                      </div>
                    )}

                    {product.stock === 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 truncate">
                      {product.category}
                    </p>

                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 font-bold text-sm sm:text-base">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        className="bg-indigo-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm hover:bg-indigo-700 disabled:opacity-50"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>

                    <button
                      className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 mt-2"
                      onClick={() => openQuickView(product)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 sm:px-3 sm:py-1 rounded-md border border-gray-300 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 sm:px-3 sm:py-1 rounded-md border border-gray-300 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            <div className="text-center mt-6 sm:mt-8">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-base transition-colors"
                onClick={() => navigateTo("products")}
              >
                View All Products
              </button>
            </div>
          </>
        )}
      </section>

      {/* Benefits Section */}
      <section className="my-10 sm:my-16 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            We're committed to providing the best shopping experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Carefully curated selection of premium items
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Safe and encrypted transactions
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Delivered right to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Fixed */}
      <section className="my-10 sm:my-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6">
            Get exclusive deals, new product alerts, and discounts delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className={`flex-grow px-4 py-2 sm:py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  error ? 'ring-2 ring-red-400' : ''
                }`}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className={`bg-white text-indigo-600 font-bold px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors flex items-center justify-center ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            {/* Feedback messages */}
            <div className="mt-3 h-6">
              {error && (
                <p className="text-red-200 text-sm font-medium animate-pulse">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="inline h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  {error}
                </p>
              )}
              
              {subscribed && (
                <p className="text-green-200 text-sm font-medium animate-bounce">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="inline h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  Thank you for subscribing! Check your inbox for confirmation.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;