


import React from 'react';

const OrderHistory = ({ orders, navigateTo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with back button */}
      <div className="flex items-start mb-6">
        <button
          onClick={() => navigateTo('account')}
          className="flex items-center mr-4 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="ml-1">Back</span>
        </button>
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigateTo('products')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Order #</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">
                    {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {order.items?.length ?? 0}
                  </td>
                  <td className="py-3 px-4">
                    {/* Fixed: Safely handle undefined total */}
                    ${order.total !== undefined ? order.total.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigateTo(`account/orders/${order.id}`)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;