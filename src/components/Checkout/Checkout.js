import React, { useState } from 'react';
import ShippingAddress from './ShippingAddress';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';

const Checkout = ({ cart, user, placeOrder, navigateTo }) => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(user);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handleSubmitOrder = () => {
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      shippingAddress,
      paymentMethod,
      status: 'Processing'
    };
    placeOrder(order);
    navigateTo('order-success', null, order.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex mb-8">
          <div className={`w-1/3 text-center ${step >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
            <div className="mb-2">1. Shipping</div>
          </div>
          <div className={`w-1/3 text-center ${step >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
            <div className="mb-2">2. Payment</div>
          </div>
          <div className={`w-1/3 text-center ${step >= 3 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
            <div className="mb-2">3. Review</div>
          </div>
        </div>

        {step === 1 && (
          <ShippingAddress 
            address={shippingAddress} 
            setAddress={setShippingAddress} 
            nextStep={() => setStep(2)} 
          />
        )}

        {step === 2 && (
          <PaymentMethod 
            method={paymentMethod} 
            setMethod={setPaymentMethod} 
            prevStep={() => setStep(1)} 
            nextStep={() => setStep(3)} 
          />
        )}

        {step === 3 && (
          <div>
            <OrderSummary 
              cart={cart} 
              address={shippingAddress} 
              paymentMethod={paymentMethod} 
            />
            <div className="flex justify-between mt-8">
              <button 
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button 
                className="bg-indigo-600 text-white px-6 py-2 rounded"
                onClick={handleSubmitOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;