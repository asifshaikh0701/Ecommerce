import React, { useState } from 'react';

const mockProducts = [
  { id: 1, name: 'Organic Tomatoes', category: 'Vegetables' },
  { id: 2, name: 'Fresh Milk', category: 'Dairy' },
  { id: 3, name: 'Free Range Eggs', category: 'Poultry' },
  { id: 4, name: 'Basmati Rice', category: 'Grains' },
  { id: 5, name: 'Raw Honey', category: 'Natural Products' },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setQuery(keyword);
    if (keyword.trim() !== '') {
      const results = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Search Products</h1>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for vegetables, dairy, grains..."
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="mt-6">
          {filtered.length > 0 ? (
            <ul className="space-y-4">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  className="p-4 bg-green-100 rounded shadow hover:bg-green-200 transition"
                >
                  <p className="text-lg font-semibold text-green-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="text-gray-500 mt-4">No products found for "{query}".</p>
          ) : (
            <p className="text-gray-400 mt-4">Start typing to search...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
export { Search };