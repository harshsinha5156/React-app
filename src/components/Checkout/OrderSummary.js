import React from 'react';

const OrderSummary = ({ cart, address, paymentMethod }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="border-b pb-4 mb-4">
        <h3 className="font-medium mb-2">Items ({cart.length})</h3>
        <div className="space-y-2">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 overflow-hidden">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h3 className="font-medium mb-2">Shipping Address</h3>
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zip}</p>
        <p>{address.country}</p>
        <p>{address.phone}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <p>
          {paymentMethod === 'credit-card' && 'Credit Card'}
          {paymentMethod === 'paypal' && 'PayPal'}
          {paymentMethod === 'cod' && 'Cash on Delivery'}
        </p>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${calculateTotal()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;