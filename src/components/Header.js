// import React, { useState, useRef, useEffect } from 'react';
// import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

// const Header = ({ wishlistCount, cartCount, onCartClick, onNavigate, activePage }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const categoriesRef = useRef(null);
//   const searchRef = useRef(null);

//   const categories = [
//     "Electronics", 
//     "Home & Kitchen", 
//     "Fashion", 
//     "Beauty", 
//     "Sports", 
//     "Books"
//   ];

//   const popularSearches = [
//     "Wireless headphones",
//     "Running shoes",
//     "Laptop deals",
//     "Smart home devices",
//     "Skincare routine"
//   ];

//   const handleNavigation = (page, params = {}) => {
//     onNavigate(page, params);
//     setMobileMenuOpen(false);
//     setIsCategoriesOpen(false);
//   };

//   const handleCategorySelect = (category) => {
//     handleNavigation('products', { category });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // Navigate to products page with search query
//       handleNavigation('products', { search: searchQuery });
//       setSearchQuery('');
//       setIsSearchFocused(false);
//     }
//   };

//   const handleSearchSuggestion = (suggestion) => {
//     setSearchQuery(suggestion);
//     // Navigate to products page with search suggestion
//     handleNavigation('products', { search: suggestion });
//     setIsSearchFocused(false);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
//         setIsCategoriesOpen(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchFocused(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         {/* Top Bar */}
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <div 
//             className="text-2xl font-bold text-indigo-700 cursor-pointer"
//             onClick={() => handleNavigation('home')}
//           >
//             Shop<span className="text-orange-500">Ease</span>
//           </div>
          
//           {/* Search Bar */}
//           <div ref={searchRef} className="hidden md:block flex-1 mx-8 max-w-2xl relative">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products, brands, categories..."
//                 className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onFocus={() => setIsSearchFocused(true)}
//               />
//               <button 
//                 type="submit"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//               >
//                 <FaSearch size={18} />
//               </button>
//             </form>
            
//             {/* Search Suggestions */}
//             {isSearchFocused && (
//               <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-20">
//                 <div className="p-4 border-b border-gray-100">
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {popularSearches.map((search, index) => (
//                       <button
//                         key={index}
//                         className="px-3 py-1 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm rounded-full transition-colors"
//                         onClick={() => handleSearchSuggestion(search)}
//                       >
//                         {search}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
                
//                 {searchQuery && (
//                   <div className="p-2">
//                     <button 
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
//                       onClick={handleSearch}
//                     >
//                       <FaSearch className="mr-2 text-gray-500" />
//                       Search for "{searchQuery}"
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Icons */}
//           <div className="flex items-center space-x-4">
//             <button 
//               className="md:hidden text-gray-600 hover:text-indigo-600"
//               onClick={() => setIsSearchFocused(!isSearchFocused)}
//             >
//               <FaSearch size={20} />
//             </button>
            
//             <button 
//               className="relative text-gray-600 hover:text-indigo-600"
//               onClick={() => handleNavigation('wishlist')}
//             >
//               <FaHeart size={20} />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </button>
            
//             <button 
//               className="relative text-gray-600 hover:text-indigo-600"
//               onClick={onCartClick}
//             >
//               <FaShoppingCart size={20} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
            
//             <button 
//               className="text-gray-600 hover:text-indigo-600"
//               onClick={() => handleNavigation('account')}
//             >
//               <FaUser size={20} />
//             </button>
            
//             <button 
//               className="md:hidden text-gray-600 hover:text-indigo-600"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Search Bar */}
//         {isSearchFocused && (
//           <div className="md:hidden px-4 py-2">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products, brands, categories..."
//                 className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//               />
//               <button 
//                 type="submit"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//               >
//                 <FaSearch size={18} />
//               </button>
//             </form>
//           </div>
//         )}
        
//         {/* Navigation */}
//         <nav className={`md:flex ${mobileMenuOpen ? 'block' : 'hidden'} py-2 border-t border-gray-200`}>
//           <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6">
//             <li>
//               <button 
//                 className={`${activePage === 'home' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
//                 onClick={() => handleNavigation('home')}
//               >
//                 Home
//               </button>
//             </li>
//             <li>
//               <button 
//                 className={`${activePage === 'products' ? 'text-indigo-700' : 'text-gray-700'} hover:text-indigo-600`}
//                 onClick={() => handleNavigation('products')}
//               >
//                 Products
//               </button>
//             </li>
//             <li className="relative" ref={categoriesRef}>
//               <button 
//                 className="flex items-center text-gray-600 hover:text-indigo-700"
//                 onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               >
//                 Categories
//                 <svg 
//                   className={`ml-1 h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>
//               <div 
//                 className={`absolute mt-1 bg-white shadow-lg rounded-md p-2 w-48 z-10 transition-all duration-200 ${
//                   isCategoriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
//                 } ${mobileMenuOpen ? 'md:static md:shadow-none md:w-full md:mt-0' : ''}`}
//               >
//                 {categories.map((category, index) => (
//                   <button 
//                     key={index} 
//                     className="block w-full py-2 px-4 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded transition-colors"
//                     onClick={() => handleCategorySelect(category)}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </li>
//             <li>
//               <button 
//                 className={`${activePage === 'about' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
//                 onClick={() => handleNavigation('about')}
//               >
//                 About
//               </button>
//             </li>
//             <li>
//               <button 
//                 className={`${activePage === 'contact' ? 'text-indigo-700 font-medium' : 'text-gray-600'} hover:text-indigo-700`}
//                 onClick={() => handleNavigation('contact')}
//               >
//                 Contact
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Header = ({ wishlistCount, cartCount, onCartClick, onNavigate, activePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const popularSearches = [
    "Wireless headphones",
    "Running shoes",
    "Laptop deals",
    "Smart home devices",
    "Skincare routine"
  ];

  const handleNavigation = (page, params = {}) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleNavigation('products', { search: searchQuery });
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleSearchSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    handleNavigation('products', { search: suggestion });
    setIsSearchFocused(false);
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
            onClick={() => handleNavigation('home')}
          >
            Shop<span className="text-orange-500">Ease</span>
          </div>
          
          {/* Search Bar */}
          <div ref={searchRef} className="hidden md:block flex-1 mx-8 max-w-2xl relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                <FaSearch size={18} />
              </button>
            </form>
            
            {/* Search Suggestions */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-20">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm rounded-full transition-colors"
                        onClick={() => handleSearchSuggestion(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
                
                {searchQuery && (
                  <div className="p-2">
                    <button 
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
                      onClick={handleSearch}
                    >
                      <FaSearch className="mr-2 text-gray-500" />
                      Search for "{searchQuery}"
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
              onClick={() => setIsSearchFocused(!isSearchFocused)}
            >
              <FaSearch size={20} />
            </button>
            
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
        
        {/* Mobile Search Bar */}
        {isSearchFocused && (
          <div className="md:hidden px-4 py-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                <FaSearch size={18} />
              </button>
            </form>
          </div>
        )}
        
        {/* Navigation - Centered and without categories */}
        <nav className={`md:flex ${mobileMenuOpen ? 'block' : 'hidden'} py-2 border-t border-gray-200`}>
          <ul className="flex flex-col items-center md:flex-row md:space-x-8 justify-center space-y-2 md:space-y-0">
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
                className={`${activePage === 'products' ? 'text-indigo-700' : 'text-gray-700'} hover:text-indigo-600`}
                onClick={() => handleNavigation('products')}
              >
                Products
              </button>
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