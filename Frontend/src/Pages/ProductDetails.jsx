
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaStar, FaBoxOpen, FaTag, FaHeart, FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // ✅ Fetch single product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://ecommerce1-tq6e.onrender.com/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch product:", err);
    }
  };

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `https://ecommerce1-tq6e.onrender.com/api/wishlist/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchWishlist();
    // eslint-disable-next-line
  }, [id]);

  // ✅ Check if product in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // ✅ Add to cart
  const handleAddToCart = async () => {
    if (!user?._id) {
      alert("You need to log in to add products to the cart.");
      return;
    }

    try {
      const payload = {
        customerId: user._id,
        productId: product._id,
        quantity: 1,
      };

      await axios.post(
        "https://ecommerce1-tq6e.onrender.com/api/cart/add-product",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Product added to cart!");
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      alert("Failed to add to cart. Please try again.");
    }
  };

  // ✅ Add to wishlist
  const handleAddToWishlist = async () => {
    if (!user?._id) {
      alert("You need to log in to add products to the wishlist.");
      return;
    }

    if (isInWishlist(product._id)) {
      alert("💖 Product is already in your wishlist!");
      return;
    }

    try {
      const payload = {
        customerId: user._id,
        productId: product._id,
      };

      await axios.post("https://ecommerce1-tq6e.onrender.com/api/wishlist/add", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setWishlist((prev) => [...prev, { productId: product._id }]);
      alert("💖 Product added to your wishlist!");
    } catch (err) {
      console.error("❌ Failed to add to wishlist:", err);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  // ✅ Buy Now (direct checkout)
  const handleBuyNow = () => {
    if (!user?._id) {
      alert("You need to log in to buy products.");
      return;
    }

    const cartItem = {
      productId: product, // sending full product
      quantity: 1,
    };

    navigate("/customer/dashboard/checkout", { state: { cartItems: [cartItem] } });
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">Loading product...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef6ff] via-[#e0f7fa] to-[#fff0f5] py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto w-full bg-white/80 backdrop-blur-2xl border border-pink-200 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-10 p-10 relative"
        style={{ minHeight: "580px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🔙 Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-3 text-green-700 hover:text-green-900 text-2xl font-semibold transition"
        >
          <FaArrowLeft className="text-3xl" /> Back
        </button>

        {/* 💖 Wishlist Icon */}
        {user?.role === "customer" && (
          <div className="absolute top-6 right-6">
            {isInWishlist(product._id) && (
              <FaHeart className="text-pink-500 text-2xl" title="In wishlist" />
            )}
          </div>
        )}

        {/* Product Image */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-md border border-gray-200 mt-12 flex items-center justify-center bg-gray-50"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ height: "350px" }} // fixed height for consistency
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col justify-center space-y-4 mt-12"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-green-700">{product.name}</h1>

          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-gray-500 text-sm ml-2">(4.9)</span>
          </div>

          <p className="text-gray-700 text-md">{product.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaBoxOpen /> Stock: {product.stock}
            </span>
            <span className="flex items-center gap-1">
              <FaTag /> Category: {product.category}
            </span>
          </div>

          <p className="text-3xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          {/* Buttons — only for customers */}
          {user?.role === "customer" && (
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-pink-500 hover:to-pink-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300"
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`${
                  isInWishlist(product._id)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
                } px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300`}
                disabled={isInWishlist(product._id)}
              >
                💖 Wishlist
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;