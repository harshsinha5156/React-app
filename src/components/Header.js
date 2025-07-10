import React, { useState, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const Header = ({
  wishlistCount,
  cartCount,
  onCartClick,
  onNavigate,
  activePage,
  products,
  setFilteredProducts,
  setSearchTerm,
  searchTerm,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const handleNavigation = (page, params = {}) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
    setIsSearchFocused(false); // Close dropdown when navigating
  };

  // Featured products
  const featuredProducts = products.filter((product) => product.isFeatured);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const filtered =
      searchTerm.trim() === ""
        ? products
        : products
            .filter((product) => product.isFeatured)
            .filter(
              (product) =>
                product.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                product.category
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            );
    setFilteredProducts(filtered);
    setCurrentPage(1); // reset page on search
  }, [searchTerm, products]);

  const handleSearchSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    handleNavigation("products", { search: suggestion });
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-indigo-700 cursor-pointer"
            onClick={() => handleNavigation("home")}
          >
            Shop<span className="text-orange-500">Ease</span>
          </div>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className="hidden md:block flex-1 mx-8 max-w-2xl relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchFocused(true); // Show dropdown when typing
                }}
                onFocus={() => setIsSearchFocused(true)} // Show dropdown when focused
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                onClick={() => handleNavigation("products")}
              >
                <FaSearch size={18} />
              </button>
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-20 max-h-96 overflow-y-auto">
                {/* Featured Products */}
                {searchTerm.trim() === "" ? (
                  featuredProducts.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Featured Products
                      </h3>
                      <div className="space-y-2">
                        {featuredProducts.slice(0, 3).map((product) => (
                          <button
                            key={product.id}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded-md flex items-center"
                            onClick={() =>
                              handleSearchSuggestion(product.title)
                            }
                          >
                            
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.title}
                              </div>
                              
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Matching Products
                      </h3>
                      <div className="space-y-2">
                        {products
                          .filter(
                            (product) =>
                              product.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              product.category
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              product.description
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                          )
                          .slice(0, 4)
                          .map((product) => (
                            <button
                              key={product.id}
                              className="w-full text-left p-2 hover:bg-gray-50 rounded-md flex items-center"
                              onClick={() =>
                                handleSearchSuggestion(product.title)
                              }
                            >
                              
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.title}
                                </div>
                                
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                    
                  </>
                )}
                
                {searchTerm.trim() !== "" && (
                  <div className="p-2">
                    <button
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between"
                      onClick={() => handleNavigation("products")}
                    >
                      <div className="flex items-center">
                        <FaSearch className="mr-2 text-gray-500" />
                        View all results for "{searchTerm}"
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {
                          products.filter((p) =>
                            p.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ).length
                        }{" "}
                        items
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-600 hover:text-indigo-600"
              onClick={() => {
                setIsSearchFocused(!isSearchFocused);
                setMobileMenuOpen(false);
              }}
            >
              <FaSearch size={20} />
            </button>

            <button
              className="relative text-gray-600 hover:text-indigo-600"
              onClick={() => handleNavigation("wishlist")}
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
              onClick={() => onNavigate("account")}
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

        {/* Mobile Search Bar */}
        {isSearchFocused && (
          <div className="md:hidden px-4 py-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                autoFocus
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                onClick={() => handleNavigation("products")}
              >
                <FaSearch size={18} />
              </button>
            </div>

            {/* Mobile Search Dropdown */}
            {isSearchFocused && (
              <div className="bg-white shadow-lg rounded-lg mt-1 z-20 max-h-96 overflow-y-auto">
                {/* Featured Products */}
                {/* Featured Products */}
                {searchTerm.trim() === "" ? (
                  featuredProducts.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Featured Products
                      </h3>
                      <div className="space-y-2">
                        {featuredProducts.slice(0, 3).map((product) => (
                          <button
                            key={product.id}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded-md flex items-center"
                            onClick={() =>
                              handleSearchSuggestion(product.title)
                            }
                          >
                            
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.title}
                              </div>
                              
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Matching Products
                      </h3>
                      <div className="space-y-2">
                        {products
                          .filter(
                            (product) =>
                              product.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              product.category
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              product.description
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                          )
                          .slice(0, 4)
                          .map((product) => (
                            <button
                              key={product.id}
                              className="w-full text-left p-2 hover:bg-gray-50 rounded-md flex items-center"
                              onClick={() =>
                                handleSearchSuggestion(product.title)
                              }
                            >
                              
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.title}
                                </div>
                                
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                    
                  </>
                )}

                {/* View All Results Button */}
                {searchTerm.trim() !== "" && (
                  <div className="p-2">
                    <button
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between"
                      onClick={() => handleNavigation("products")}
                    >
                      <div className="flex items-center">
                        <FaSearch className="mr-2 text-gray-500" />
                        View all results for "{searchTerm}"
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {
                          products.filter((p) =>
                            p.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ).length
                        }{" "}
                        items
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav
          className={`md:flex ${
            mobileMenuOpen ? "block" : "hidden"
          } py-2 border-t border-gray-200`}
        >
          <ul className="flex flex-col items-center md:flex-row md:space-x-8 justify-center space-y-2 md:space-y-0">
            <li>
              <button
                className={`${
                  activePage === "home"
                    ? "text-indigo-700 font-medium"
                    : "text-gray-600"
                } hover:text-indigo-700`}
                onClick={() => handleNavigation("home")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`${
                  activePage === "products"
                    ? "text-indigo-700"
                    : "text-gray-700"
                } hover:text-indigo-600`}
                onClick={() => handleNavigation("products")}
              >
                Products
              </button>
            </li>
            <li>
              <button
                className={`${
                  activePage === "about"
                    ? "text-indigo-700 font-medium"
                    : "text-gray-600"
                } hover:text-indigo-700`}
                onClick={() => handleNavigation("about")}
              >
                About
              </button>
            </li>
            <li>
              <button
                className={`${
                  activePage === "contact"
                    ? "text-indigo-700 font-medium"
                    : "text-gray-600"
                } hover:text-indigo-700`}
                onClick={() => handleNavigation("contact")}
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
