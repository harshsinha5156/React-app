import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import QuickViewModal from './components/QuickViewModal';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Set dynamic page title
  useEffect(() => {
    document.title = `ShopEasy - Page ${currentPage}`;
  }, [currentPage]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-red-500">
      <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-2">ShopEasy</h1>
        <p className="text-center text-gray-600">Discover amazing products</p>
      </header>

      <main>
        <ProductGrid products={currentProducts} onQuickView={openQuickView} />
        
        {products.length > productsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </main>

      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={closeQuickView} 
        />
      )}

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;