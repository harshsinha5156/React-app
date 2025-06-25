import { useEffect } from 'react';

const QuickViewModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="mb-4">
              <span className="text-gray-600">Category:</span> 
              <span className="ml-2 capitalize">{product.category}</span>
            </div>
            <div className="flex items-center mb-6">
              <span className="text-gray-600">Rating:</span>
              <span className="ml-2">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;