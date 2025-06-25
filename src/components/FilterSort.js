// src/components/FilterSort.js
import React from 'react';

export default function FilterSort({ setFilter, setSort }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      <div>
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}