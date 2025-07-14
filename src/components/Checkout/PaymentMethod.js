import React from 'react';

const PaymentMethod = ({ method, setMethod, prevStep, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="credit-card"
              name="payment"
              
              value="credit-card"
              checked={method === 'credit-card'}
              onChange={() => setMethod('credit-card')}
              className="mr-2"
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              checked={method === 'paypal'}
              onChange={() => setMethod('paypal')}
              className="mr-2"
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={method === 'cod'}
              onChange={() => setMethod('cod')}
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>

        {method === 'credit-card' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button 
            type="button"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
            onClick={prevStep}
          >
            Back
          </button>
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentMethod;