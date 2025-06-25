// src/components/Cart.js
import React from 'react';

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.title} - ${item.price}
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}