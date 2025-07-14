import React from 'react';

const OrderDetails = ({ order, navigateTo }) => {
  if (!order) return <div>Loading order details...</div>;

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.id}</h2>
          <p className="text-gray-600">
            Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-medium capitalize">{order.paymentMethod}</p>
            <p className="mt-2">Status: Paid</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Order Items</h3>
      <div className="border rounded mb-8">
        {order.items.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
            <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 overflow-hidden">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold text-lg">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigateTo('account/orders')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;