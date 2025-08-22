



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `https://ecommerce1-tq6e.onrender.com/api/cart/getcart/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setMessage("❌ Could not fetch cart.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Remove item
  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove-product/${user._id}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCartItems(res.data);
      setMessage("🗑️ Item removed from cart.");
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
      setMessage("❌ Could not remove item.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Calculate total
  const calculateTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
      0
    );

  // Proceed to checkout
  const handleProceed = () => {
    if (!cartItems.length) {
      setMessage("⚠️ Your cart is empty!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    navigate("/customer/dashboard/checkout", { state: { cartItems } });
  };

  return (
    <div className="min-h-screen pt-[80px] px-6 py-12 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">
          🛒 Your Cart
        </h1>

        {message && (
          <p className="text-center text-green-600 font-medium mb-4">{message}</p>
        )}

        {!user ? (
          <p className="text-center text-lg text-red-600">
            Please log in to view your cart.
          </p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cartItems
                .filter((item) => item.productId)
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center transition transform hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                      {item.productId.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      ₹{item.productId.price} × {item.quantity}
                    </p>
                    <div className="text-green-700 font-bold text-lg mb-4">
                      ₹{item.productId.price * item.quantity}
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                ))}
            </div>

            {/* Total & Checkout */}
            <div className="text-right text-2xl font-bold mt-10 text-green-800 border-t pt-6">
              Total: ₹{calculateTotal()}
            </div>

            <div className="text-right mt-4">
              <button
                onClick={handleProceed}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md font-medium transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
