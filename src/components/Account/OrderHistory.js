


// import React from 'react';

// const OrderHistory = ({ orders, navigateTo }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//       {/* Header with back button */}
//       <div className="flex items-start mb-4 md:mb-6">
//         <button
//           onClick={() => navigateTo('account')}
//           className="flex items-center mr-4 text-gray-600 hover:text-gray-800 transition-colors"
//           aria-label="Go back"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           <span className="ml-1 hidden sm:inline">Back</span>
//         </button>
//         <h2 className="text-xl md:text-2xl font-bold">Order History</h2>
//       </div>
      
//       {orders.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
//           <button
//             onClick={() => navigateTo('products')}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
//           >
//             Browse Products
//           </button>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           {/* Desktop Table (hidden on mobile) */}
//           <table className="min-w-full hidden md:table">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left">Order #</th>
//                 <th className="py-3 px-4 text-left">Date</th>
//                 <th className="py-3 px-4 text-left">Items</th>
//                 <th className="py-3 px-4 text-left">Total</th>
//                 <th className="py-3 px-4 text-left">Status</th>
//                 <th className="py-3 px-4 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">#{order.id}</td>
//                   <td className="py-3 px-4">
//                     {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
//                   </td>
//                   <td className="py-3 px-4">
//                     {order.items?.length ?? 0}
//                   </td>
//                   <td className="py-3 px-4">
//                     ${order.total !== undefined ? order.total.toFixed(2) : '0.00'}
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
//                       order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
//                       order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {order.status || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <button
//                       onClick={() => navigateTo(`account/orders/${order.id}`)}
//                       className="text-indigo-600 hover:text-indigo-800 transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {/* Mobile Cards (visible only on mobile) */}
//           <div className="md:hidden space-y-4">
//             {orders.map(order => (
//               <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="font-semibold">Order #{order.id}</div>
//                     <div className="text-gray-500 text-sm mt-1">
//                       {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
//                     </div>
//                   </div>
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
//                     order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
//                     order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {order.status || 'Unknown'}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between mt-3">
//                   <div>
//                     <span className="text-gray-600">{order.items?.length ?? 0} items</span>
//                   </div>
//                   <div className="font-semibold">
//                     ${order.total !== undefined ? order.total.toFixed(2) : '0.00'}
//                   </div>
//                 </div>
                
//                 <div className="mt-3 text-right">
//                   <button
//                     onClick={() => navigateTo(`account/orders/${order.id}`)}
//                     className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;



import React from 'react';

const OrderHistory = ({ orders, navigateTo }) => {
  // Helper function to safely format currency
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '0.00';
    const num = Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      {/* Header with back button */}
      <div className="flex items-start mb-4 md:mb-6">
        <button
          onClick={() => navigateTo('account')}
          className="flex items-center mr-4 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 hidden sm:inline">Back</span>
        </button>
        <h2 className="text-xl md:text-2xl font-bold">Order History</h2>
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
          {/* Desktop Table */}
          <table className="min-w-full hidden md:table">
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
                    ${formatCurrency(order.total)}
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
          
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">Order #{order.id}</div>
                    <div className="text-gray-500 text-sm mt-1">
                      {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between mt-3">
                  <div>
                    <span className="text-gray-600">{order.items?.length ?? 0} items</span>
                  </div>
                  <div className="font-semibold">
                    ${formatCurrency(order.total)}
                  </div>
                </div>
                
                <div className="mt-3 text-right">
                  <button
                    onClick={() => navigateTo(`account/orders/${order.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;