
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegSadTear, FaStar, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Recommended = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState(null);

  // Modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Address form state
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Fetch products & wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ecommerce1-tq6e.onrender.com/api/products/getallproduct");
        setProducts(res.data);

        // Initialize quantities only if not already set
        setQuantities((prev) => {
          const copy = { ...prev };
          res.data.forEach((p) => {
            if (!copy[p._id]) copy[p._id] = 1;
          });
          return copy;
        });
      } catch {
        showToast("❌ Could not load products.", "error");
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      if (!user || !token) return;
      try {
        const res = await axios.get("https://ecommerce1-tq6e.onrender.com/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data.products || []);
      } catch {
        console.error("❌ Failed to fetch wishlist");
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [user, token]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  const handleAddToCart = async (productId) => {
    if (!user || !token) return showToast("❌ Please login to add to cart.", "error");
    try {
      await axios.post(
        "https://ecommerce1-tq6e.onrender.com/api/cart/add-product",
        { customerId: user._id, productId, quantity: quantities[productId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("✅ Added to cart!");
    } catch {
      showToast("❌ Failed to add to cart.", "error");
    }
  };

  const openCheckoutModal = (product) => {
    setCurrentProduct(product);
    setCheckoutModalOpen(true);
    setCustomerDetails({
      name: user?.name || "",
      address: user?.address || "",
      phone: user?.phone || "",
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user || !token || !currentProduct) return showToast("❌ Error placing order.", "error");

    const quantity = quantities[currentProduct._id] || 1;
    const totalAmount = currentProduct.price * quantity;

    const orderData = {
      customerId: user._id,
      customerName: customerDetails.name,
      address: customerDetails.address,
      phone: customerDetails.phone,
      items: [{ productId: currentProduct._id, quantity, price: currentProduct.price }],
      totalAmount,
      paymentMethod: "Cash on Delivery",
    };

    try {
      await axios.post("https://ecommerce1-tq6e.onrender.com/api/orders/placeorder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("✅ Order placed!");
      setCheckoutModalOpen(false);

      setQuantities((prev) => {
        const copy = { ...prev };
        delete copy[currentProduct._id];
        return copy;
      });
    } catch (err) {
      console.error(err.response?.data || err);
      showToast("❌ Failed to place order.", "error");
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!user || !token) return showToast("❌ Please login to add to wishlist.", "error");
    if (isInWishlist(productId)) return showToast("💖 Already in wishlist!", "info");

    try {
      await axios.post(
        "https://ecommerce1-tq6e.onrender.com/api/wishlist/add",
        { customerId: user._id, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => [...prev, { _id: productId }]);
      showToast("💖 Added to wishlist!");
    } catch {
      showToast("❌ Failed to add to wishlist.", "error");
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen p-6 relative py-10 px-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 overflow-hidden"
      
    >
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "info"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
          🌟 Recommended Products
        </h2>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-200 h-40 w-full"></div>
              <div className="p-4 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-gray-500">
          <FaRegSadTear size={40} />
          <p className="mt-2 text-sm">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative border border-gray-100 hover:shadow-2xl transform transition-all"
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {p.isNew && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow">
                    New
                  </span>
                )}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToWishlist(p._id)}
                  disabled={isInWishlist(p._id)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
                    isInWishlist(p._id)
                      ? "bg-pink-500 text-white"
                      : "bg-white hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  <FaHeart
                    className={`text-lg transition-colors duration-300 ${
                      isInWishlist(p._id) ? "text-white" : "text-gray-600"
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-800 truncate flex items-center gap-1">
                  {p.name}
                  {p.rating && (
                    <span className="flex items-center text-yellow-500 text-xs">
                      <FaStar className="mr-1" /> {p.rating}
                    </span>
                  )}
                </h3>
                <p className="text-green-600 font-bold mt-1">₹{p.price}</p>
                <p className="text-xs text-gray-500">{p.category}</p>

                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => handleQuantityChange(p._id, -1)}
                    className="bg-green-200 px-2 py-1 rounded hover:bg-green-300 transition"
                  >
                    −
                  </button>
                  <span>{quantities[p._id]}</span>
                  <button
                    onClick={() => handleQuantityChange(p._id, 1)}
                    className="bg-green-200 px-2 py-1 rounded hover:bg-green-300 transition"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(p._id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1.5 rounded-lg hover:opacity-90 text-sm shadow"
                  >
                    🛒 Add
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCheckoutModal(p)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-1.5 rounded-lg hover:opacity-90 text-sm shadow"
                  >
                    🛍 Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-18 rounded-lg w-full max-w-md relative"
            >
              <h2 className="text-2xl font-bold mb-4">Enter Address</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerDetails.name}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, name: e.target.value })
                  }
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <textarea
                  placeholder="Address"
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, address: e.target.value })
                  }
                  required
                  className="w-full border px-4 py-2 rounded"
                ></textarea>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={customerDetails.phone}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, phone: e.target.value })
                  }
                  required
                  className="w-full border px-4 py-2 rounded"
                />

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recommended;

