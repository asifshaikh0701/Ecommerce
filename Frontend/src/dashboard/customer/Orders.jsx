import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `https://ecommerce1-tq6e.onrender.com/api/orders/customer/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <p className="text-gray-700 text-lg font-medium">Loading orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🛒 Your Orders
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-8 text-center border">
            <p className="text-gray-600 text-lg">
              You haven’t placed any orders yet.
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className="bg-white border border-gray-100 p-6 rounded-xl shadow-lg"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-gray-600 text-sm">{order._id}</span>
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-3">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                {/* Customer Info */}
<div className="p-4 rounded-xl shadow-sm mb-4 bg-gradient-to-r from-green-50 to-green-100">
  <p className="text-sm text-gray-700">
    <span className="font-semibold text-green-800">Customer:</span>{" "}
    {order.customerName}
  </p>
  <p className="text-sm text-gray-700">
    <span className="font-semibold text-green-800">Phone:</span> {order.phone}
  </p>
  <p className="text-sm text-gray-700">
    <span className="font-semibold text-green-800">Address:</span> {order.address}
  </p>
</div>


                {/* Product Items */}
                <div className="space-y-3">
                  {order.items.map((item) => {
                    const product = item.productId || {};
                    const imageSrc = product.image?.startsWith("http")
                      ? product.image
                      : `https://ecommerce1-tq6e.onrender.com/uploads/${product.image}`;

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 border rounded-lg p-3"
                      >
                        {product.image ? (
                          <img
                            src={imageSrc}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                            onError={(e) => (e.target.src = "/default.jpg")}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                            No Image
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} | ₹{item.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <p className="font-bold text-gray-800 mt-5 text-right">
                  Total: ₹{order.totalAmount}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;




