


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get("https://ecommerce1-tq6e.onrender.com/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlist(res.data.products || []);
    } catch (err) {
      console.error("❌ Failed to fetch wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("❌ Failed to remove from wishlist:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your wishlist is empty.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 px-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 overflow-hidden">
      {/* Animated Pastel Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full opacity-40 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-80 h-80 bg-blue-200 rounded-full opacity-40 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-200 rounded-full opacity-40 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
      />

      <h1 className="relative z-10 text-4xl font-extrabold text-green-700 mb-10 text-center drop-shadow-md">
        💗 Your Wishlist
      </h1>

      <div className="relative z-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {wishlist.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden border border-white/40 flex flex-col"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative group">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-green-500/90 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                ₹{product.price}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-800 truncate mb-4">
                {product.name}
              </h2>

              <motion.button
                onClick={() => handleRemove(product._id)}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-red-500/90 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
              >
                <FaTrash className="text-xs" /> Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
