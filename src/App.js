
import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserProfileForm from './components/UserProfileForm';
import HomePage from './components/HomePage';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import OfferPopup from './components/OfferPopup';
import QuickViewModal from './components/QuickViewModal';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductsPage from './components/ProductsPage';
import Checkout from './components/Checkout';
import './index.css';

function App() {
  const [showOffer, setShowOffer] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState(null);

  
  // Mock product data with  products
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


   // Add user state
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    profileImage: null,
  });
  
  useEffect(() => {
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          title: "Premium Wireless Headphones",
          price: 129.99,
          description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.8,
          stock: 15,
          isFeatured: true
        },
        {
          id: 2,
          title: "Smart Fitness Watch",
          price: 199.99,
          description: "Track your fitness goals with this advanced smartwatch. Monitors heart rate, sleep patterns, and includes GPS for outdoor activities.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.6,
          stock: 8,
          isFeatured: true
        },
        {
          id: 3,
          title: "Modern Coffee Maker",
          price: 89.99,
          description: "Brew perfect coffee every time with our programmable coffee maker. Features thermal carafe, 24-hour timer, and adjustable brew strength.",
          category: "Home & Kitchen",
          imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.5,
          stock: 22,
          isFeatured: false
        },
        {
   
          id: 4,
         title: " Office Chair",
         price: 249.99,
         description: "Support your posture during long work hours with our ergonomic chair. Features adjustable lumbar support, headrest, and breathable mesh fabric.",
         category: "Furniture",
         imageUrl: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600",
         rating: 4.7,
         stock: 5,
         isFeatured: true

        },
        {
          id: 5,
          title: "Bluetooth Portable Speaker",
          price: 79.99,
          description: "Take your music anywhere with this waterproof portable speaker. Delivers rich, powerful sound with 15-hour battery life.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.4,
          stock: 18,
          isFeatured: false
        },
        {
          id: 6,
          title: "Stainless Steel Cookware Set",
          price: 149.99,
          description: "Professional-grade cookware set for your kitchen. Even heat distribution, oven-safe up to 500°F, and dishwasher safe.",
          category: "Home & Kitchen",
          imageUrl: "https://images.pexels.com/photos/6605310/pexels-photo-6605310.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.9,
          stock: 12,
          isFeatured: true
        },
        {
          id: 7,
          title: "Wireless Charging Pad",
          price: 29.99,
          description: "Charge your Qi-enabled devices effortlessly. Features non-slip surface and LED charging indicator.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/7952558/pexels-photo-7952558.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.3,
          stock: 30,
          isFeatured: false
        },
        {
          id: 8,
          title: "Mattress",
          price: 599.99,
          description: "Experience ultimate comfort with our premium memory foam mattress. Provides excellent support and pressure relief.",
          category: "Home & Kitchen",
          imageUrl: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.8,
          stock: 7,
          isFeatured: true
        },
        {
          id: 9,
          title: "Smartphone",
          price: 99.99,
          description: "Capture smooth, professional-quality videos with this 3-axis smartphone stabilizer. Perfect for vloggers and content creators.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.7,
          stock: 14,
          isFeatured: true
        },
        {
          id: 10,
          title: "Designer Leather Handbag",
          price: 199.99,
          description: "Elegant designer handbag made from genuine leather. Features multiple compartments and a detachable shoulder strap.",
          category: "Fashion",
          imageUrl: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.6,
          stock: 9,
          isFeatured: true
        },
        {
          id: 11,
          title: "Professional Drone with Camera",
          price: 499.99,
          description: "4K camera drone with GPS positioning, 30-minute flight time, and obstacle avoidance technology. Perfect for aerial photography.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.9,
          stock: 6,
          isFeatured: true
        },
        {
          id: 12,
          title: "Yoga Mat & Accessories Set",
          price: 49.99,
          description: "Eco-friendly yoga mat with carrying strap, blocks, and resistance band. Perfect for home workouts and studio practice.",
          category: "Sports",
          imageUrl: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.5,
          stock: 25,
          isFeatured: false
        },
        {
          id: 13,
          title: "Laptop",
          price: 89.99,
          description: "Professional electric toothbrush with 5 cleaning modes, pressure sensor, and travel case. Improves gum health and whitens teeth.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.8,
          stock: 18,
          isFeatured: true
        },
        {
          id: 14,
          title: "Smart Home Security System",
          price: 299.99,
          description: "Complete home security system with HD cameras, motion sensors, and 24/7 professional monitoring. Connects to your smartphone.",
          category: "Home & Kitchen",
          imageUrl: "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.7,
          stock: 11,
          isFeatured: true
        },
        {
          id: 15,
          title: "Premium Skincare Set",
          price: 129.99,
          description: "Complete anti-aging skincare regimen with cleanser, serum, moisturizer, and eye cream. Made with natural ingredients.",
          category: "Beauty & Health",
          imageUrl: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.9,
          stock: 16,
          isFeatured: true
        },
        {
          id: 16,
          title: "Wireless Gaming Headset",
          price: 149.99,
          description: "Immersive gaming headset with 7.1 surround sound, noise-canceling microphone, and 20-hour battery life. Compatible with all platforms.",
          category: "Electronics",
          imageUrl: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600",
          rating: 4.8,
          stock: 13,
          isFeatured: true
        },

        {
         id: 17,
        title: "Noise Cancelling Earbuds Pro",
        price: 149.99,
        description: "True wireless earbuds with active noise cancellation, 24h battery life, and water resistance for workouts.",
        category: "Electronics",
        imageUrl: "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.7,
        stock: 21,
        isFeatured: true
},
{
       id: 18,
      title: "Ultra HD Smart TV 55-inch",
      price: 699.99,
      description: "Crystal-clear 4K display with HDR10+, smart platform with streaming apps, and voice control compatibility.",
      category: "Electronics",
      imageUrl: "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.8,
  stock: 8,
  isFeatured: true
},
{
  id: 19,
  title: "Doormat",
  price: 19.99,
  description: "Durable coir doormat with non-slip backing, traps dirt and moisture, easy to clean — ideal for indoor or outdoor use.",
  category: "Home & Kitchen",
  imageUrl: "https://images.pexels.com/photos/2950003/pexels-photo-2950003.jpeg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.6,
  stock: 14,
  isFeatured: false
},
{
  id: 20,
  title: "Luxury Egyptian Cotton Sheets",
  price: 89.99,
  description: "1000-thread count bed sheets with deep pockets, breathable fabric, and hotel-quality softness.",
  category: "Home & Kitchen",
  imageUrl: "https://images.pexels.com/photos/6585755/pexels-photo-6585755.jpeg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.9,
  stock: 26,
  isFeatured: true
},
{
  id: 21,
  title: "Professional DSLR Camera Kit",
  price: 1299.99,
  description: "24MP DSLR with 18-55mm lens, 4K video recording, and Wi-Fi connectivity for instant sharing.",
  category: "Electronics",
  imageUrl: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.9,
  stock: 6,
  isFeatured: true
},
{
  id: 22,
  title: "Adjustable Dumbbell Set",
  price: 299.99,
  description: "Space-saving adjustable dumbbells from 5-50lbs with dial system and ergonomic grips.",
  category: "Sports",
  imageUrl: "https://images.pexels.com/photos/17840/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.7,
  stock: 9,
  isFeatured: false
},
{
  id: 23,
  title: "Sofa set",
  price: 349.99,
  description: "Elegant and cozy sofa set with premium fabric, perfect for modern living rooms and everyday comfort.",
  category: "Furniture",
  imageUrl: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.8,
  stock: 7,
  isFeatured: true
},
{
  id: 24,
  title: "Bluetooth Beanie Hat",
  price: 39.99,
  description: "Winter hat with built-in wireless headphones, microphone, and 10-hour playback time.",
  category: "Fashion",
  imageUrl: "https://images.pexels.com/photos/6634370/pexels-photo-6634370.jpeg?auto=compress&cs=tinysrgb&w=600",
  rating: 4.3,
  stock: 32,
  isFeatured: false
}

      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 800);
  }, []);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    setIsCartOpen(true);
  };






  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? {...item, quantity: newQuantity} 
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    
  };

  
  // Add function to update user profile
  const updateUserProfile = (newProfileData) => {
    setUser(prev => ({ ...prev, ...newProfileData }));
    alert('Profile updated successfully!');
  };
  

  

  
  // Update navigateTo function to handle category filtering
  const navigateTo = (page, product = null) => {
     setActivePage(page);
     setActiveProduct(product);
     window.scrollTo(0, 0);
  };



  const openQuickView = (product) => {
    setQuickViewProduct(product);
    
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        wishlistCount={wishlist.length} 
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onNavigate={navigateTo}
        activePage={activePage}
        products={products} 
        setFilteredProducts = {setFilteredProducts}
        setSearchTerm = {setSearchTerm}
        searchTerm = {searchTerm}
      />
      
      <main className="flex-grow">
        
        {activePage === 'home' && (
          <HomePage 
            filteredProducts={filteredProducts}
            products={products} 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            navigateTo={navigateTo}
            openQuickView={openQuickView}
            setSearchTerm = {setSearchTerm}
        searchTerm = {searchTerm}
          />
        )}

        
        
        {activePage === 'products' && (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedCategory ? `${selectedCategory} Collection` : "Discover Our Products"}
              </h1>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {selectedCategory 
                  ? `Premium ${selectedCategory} selection` 
                  : "Explore our premium collection across multiple categories"}
              </p>

              {selectedCategory && (
                <button
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => navigateTo('products')}
                >
                  &larr; View All Categories
                </button>
              )}
            </div>

            <ProductsPage 
            products={filteredProducts}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            isLoading={isLoading}
            openQuickView={openQuickView}
            selectedCategory={selectedCategory}
            navigateTo={navigateTo}
          />
       
            
            
          </div>
        )}

        {/* New Add */}


        {activePage === 'product-detail' && activeProduct && (
          <ProductDetailPage 
            product={activeProduct} 
            onNavigate={navigateTo}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
          />
        )}
        
        {activePage === 'wishlist' && (
          <div className="container mx-auto px-4 py-8 mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {wishlist.length > 0 
                  ? "Your favorite items are saved here" 
                  : "You haven't added any items to your wishlist yet"}
              </p>
            </div>
            
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(product => wishlist.includes(product.id))
                  .map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{product.title}</h3>
                        <p className="text-indigo-700 font-bold">${product.price.toFixed(2)}</p>
                        <div className="mt-2 flex space-x-2">
                          <button 
                            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                          <button 
                            className="text-sm border border-gray-300 text-gray-700 px-3 py-1 rounded"
                            onClick={() => toggleWishlist(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Start adding items you love!</p>
                <button 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md"
                  onClick={() => navigateTo('products')}
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>
        )}

         {activePage === 'account' && (
          <div className="container mx-auto px-4 py-8">
            <UserProfileForm 
              userData={user} 
              onUpdateProfile={updateUserProfile} 
              onNavigate={navigateTo}
            />
          </div>
        )}



        
        {activePage === 'about' && <AboutPage />}
        
        {activePage === 'contact' && <ContactPage />}
      </main>
      
      <Footer onNavigate={navigateTo} />
      
      {showOffer && (
        <OfferPopup onClose={() => setShowOffer(false)} />
      )}
      
      {/* /* Shopping Cart Sidebar */ }
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button 
                      className="ml-3 h-7 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                          <p className="text-gray-500">Add some items to your cart to get started</p>
                        </div>
                      ) : (
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                                {item.imageUrl && (
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.title}</h3>
                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                </div>
                                
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button 
                                      className="text-gray-500 hover:text-gray-600"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      -
                                    </button>
                                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                                    <button 
                                      className="text-gray-500 hover:text-gray-600"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      +
                                    </button>
                                  </div>
                                  
                                  <button 
                                    type="button" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${calculateTotal()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    
                    <div className="mt-6">
                      <button 
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Checkout
                      </button>
                    </div>
                    
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          toggleWishlist={() => toggleWishlist(quickViewProduct.id)}
          addToCart={() => {
            addToCart(quickViewProduct);
            setQuickViewProduct(null);
          }}
          onViewFullDetails={(product) => navigateTo('product-detail', product)}
        />
      )}
    </div>
  );
}

export default App;





