
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const OfferPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); 
    
    return () => clearTimeout(timer);
  }, [onClose]);

  
  const handleClaimOffer = () => {
    
    onClose();
    
   
  };

  return (
    <div className="fixed bottom-4 right-4  bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl z-50 max-w-md w-full animate-fadeInUp
">
      <div className="flex">
        <div className="p-6 flex-1">
          <h3 className="text-white text-xl font-bold mb-2">Special Offer! 🎉</h3>
          <p className="text-indigo-100 mb-4">
            Get 20% off your first order! Use code <span className="font-bold">WELCOME20</span> at checkout.
          </p>
          <button 
            className="bg-white text-indigo-700 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
            onClick={handleClaimOffer}
          >
            Claim Offer
          </button>
        </div>
        
        <div className="relative">
          <button 
            className="absolute top-2 right-2 text-white hover:text-indigo-200"
            onClick={onClose}
          >
            <FaTimes />
          </button>
          <div className="h-full w-24 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-r-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl rotate-12">20% OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;