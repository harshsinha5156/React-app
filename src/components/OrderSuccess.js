import React from 'react';

const OrderSuccess = ({ orderId, navigateTo }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-green-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl mb-6">
          Thank you for your purchase. Your order number is <span className="font-semibold">#{orderId}</span>
        </p>
        
        <p className="mb-8 text-gray-600">
          We've sent a confirmation email with your order details. 
          You can track your order status in your account.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigateTo('account/orders')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            View Order History
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;



