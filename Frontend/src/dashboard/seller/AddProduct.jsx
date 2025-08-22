
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...form,
        price: Number(form.price),
        stock: form.stock ? Number(form.stock) : 0,
      };

      await axios.post(
        "https://ecommerce1-tq6e.onrender.com/api/products/add-product",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Product added successfully!");

      // Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product. Please check your token/role.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-gray-200 to-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Add Product
          </button>
        </form>

        {message && (
          <p className="text-center mt-5 font-semibold text-green-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
