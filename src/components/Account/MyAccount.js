import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

const MyAccount = ({ user, orders, navigateTo, onLogout }) => {
   const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 mr-4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => navigateTo('account/orders')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  My Orders
                </button>
                <button
                  onClick={() => navigateTo('account/settings')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Account Settings
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                  Payment Methods
                </button>
                 <button
          onClick={() => {
            onLogout();
            navigate('/logout');
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
        >
          Logout
        </button>
              </nav>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigateTo('products')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
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
                      {orders.slice(0, 3).map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">#{order.id}</td>
                          <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{order.items.length}</td>
                          <td className="py-3 px-4">${order.total}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => navigateTo(`account/orders/${order.id}`)}
                              className="text-indigo-600 hover:text-indigo-800"
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
              
              {orders.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => navigateTo('account/orders')}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View All Orders →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;






