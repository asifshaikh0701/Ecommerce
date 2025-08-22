import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCartItems = location.state?.cartItems || [];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
  });
  const [message, setMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  // Redirect if no cart items
  useEffect(() => {
    if (!initialCartItems.length) navigate("/customer/dashboard/cart");
  }, [initialCartItems, navigate]);

  const calculateTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
      0
    );

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return;

    try {
      const response = await axios.post(
        "https://ecommerce1-tq6e.onrender.com/api/orders/placeorder",
        {
          customerId: user?._id,
          customerName: customerDetails.name,
          phone: customerDetails.phone,
          address: `${customerDetails.street}, ${customerDetails.city}, ${customerDetails.state}, ${customerDetails.postalCode}`,
          landmark: customerDetails.landmark,
          items: cartItems.map((item) => ({
            productId: item.productId?._id,
            quantity: item.quantity,
            price: item.productId?.price || 0,
          })),
          totalAmount: calculateTotal(),
          paymentMethod: "Cash on Delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCartItems([]);
      setMessage(response.data?.message || "✅ Order placed successfully!");
      setShowCelebration(true);

      // Hide celebration after a while
      setTimeout(() => {
        setShowCelebration(false);
        navigate("/customer/dashboard/orders"); // redirect to orders page
      }, 6000);
    } catch (err) {
      console.error("Order failed:", err.response?.data || err);
      setMessage(
        `❌ Could not place order: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="min-h-screen pt-[80px] px-6 py-12 bg-gray-200 text-gray-800 relative">
      {/* Celebration */}
      {showCelebration && (
        <>
          <Confetti recycle={false} numberOfPieces={500} />
          <motion.div
            className="absolute inset-0 flex justify-center items-center bg-black/40 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              🎉 Thank You, {customerDetails.name || "Customer"}! 🎉
              <motion.div
                className="mt-4 text-2xl text-yellow-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Your order has been placed successfully!
              </motion.div>
            </motion.h1>
          </motion.div>
        </>
      )}

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative z-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          📝 Checkout
        </h1>

        {/* Show message */}
        {message && !showCelebration && (
          <p className="text-center text-green-600 font-medium mb-4">{message}</p>
        )}

        {cartItems.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customerDetails.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customerDetails.phone}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              name="street"
              placeholder="Street Address"
              value={customerDetails.street}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customerDetails.city}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={customerDetails.state}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={customerDetails.postalCode}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (Optional)"
              value={customerDetails.landmark}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <div className="text-right text-xl font-bold mt-4">
              Total: ₹{calculateTotal()}
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow w-full"
            >
              Place Order
            </button>
          </form>
        ) : (
          !showCelebration && (
            <p className="text-center text-green-700 font-medium mt-4">
              No items in cart.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Checkout;
