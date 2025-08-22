
import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://ecommerce1-tq6e.onrender.com/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        // If API fails, show static demo messages
        setMessages([
          {
            customerName: "John Doe",
            message: "Hello! Could you provide more details about the shipping time?",
            date: new Date(),
          },
          {
            customerName: "Jane Smith",
            message: "I’m interested in bulk orders. Can you offer a discount?",
            date: new Date(),
          },
          {
            customerName: "Michael Brown",
            message: "Is this product available in other colors?",
            date: new Date(),
          },
        ]);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          💬 Customer Queries
        </h2>

        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages available.</p>
        ) : (
          <ul className="divide-y">
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className="py-4 px-5 rounded-lg mb-3 bg-green-50 shadow hover:shadow-lg transition duration-300"
              >
                <p className="text-lg font-semibold text-green-800">
                  {msg.customerName}
                </p>
                <p className="text-gray-700 mt-1">{msg.message}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(msg.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SellerMessages;



