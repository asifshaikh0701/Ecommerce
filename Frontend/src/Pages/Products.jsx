import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Component/Navbar";

const Products = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `https://ecommerce1-tq6e.onrender.com/api/products/getallproduct?category=${category}`
          : `https://ecommerce1-tq6e.onrender.com/api/products/getallproduct`;

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products", err);
      }
    };

    fetchProducts();
  }, [category]);

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Navbar search (desktop / tablet) */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="pt-24 pb-16 px-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-800">
              {category
                ? `Explore ${category.charAt(0).toUpperCase() + category.slice(1)}`
                : "All Products"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}.
            </p>

            {/* 🔍 Force Mobile Search Bar */}
            <div className="mt-4 block sm:hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-xl font-semibold">No products found.</p>
              <p className="text-sm mt-1">Try another category or refresh.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredProducts.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:ring-2 hover:ring-green-400 overflow-hidden transition duration-100 h-full flex flex-col">
                    <div className="relative h-56 bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                        ₹{product.price}
                      </span>
                      <span className="absolute top-2 right-2 bg-white text-gray-700 text-xs px-2 py-0.5 rounded-full border border-gray-300 capitalize">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-1 truncate">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {product.description || "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
