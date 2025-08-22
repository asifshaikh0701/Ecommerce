

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
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

  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get("https://ecommerce1-tq6e.onrender.com/api/products/seller/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch seller's products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://ecommerce1-tq6e.onrender.com/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑 Product deleted successfully.");
      fetchSellerProducts();
    } catch (err) {
      console.error("Delete failed", err);
      setMessage("❌ Failed to delete product.");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...form, price: Number(form.price), stock: Number(form.stock) };
      await axios.put(`https://ecommerce1-tq6e.onrender.com/api/products/update/${editingId}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Product updated successfully.");
      setEditingId(null);
      setForm({ name: "", description: "", price: "", stock: "", category: "", image: "" });
      fetchSellerProducts();
    } catch (err) {
      console.error("Update failed", err);
      setMessage("❌ Failed to update product. Check if you are the seller.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">📦 Your Products</h2>
        {message && <p className="text-center text-green-700 font-semibold mb-4">{message}</p>}

        {/* Edit Form */}
        {editingId && (
          <form onSubmit={handleSubmit} className="grid gap-3 bg-white p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-green-700 mb-2">✏ Edit Product</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" required />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" required />
            <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" required />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
            <button type="submit" className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md mt-2">
              Update Product
            </button>
          </form>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No products added yet.</p>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-green-100"
              >
                {/* Stock / Badge */}
                {p.stock === 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full font-semibold">Out of Stock</span>
                )}
                {p.stock < 5 && p.stock > 0 && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white px-2 py-1 text-xs rounded-full font-semibold">Low Stock</span>
                )}

                {/* New Ribbon */}
                {new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">New</span>
                )}

                {p.image && (
                  <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-3" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-1">🛒 {p.name}</h3>
                  <p className="text-gray-700 mb-1">{p.description}</p>
                  <p className="text-green-600 font-bold mb-1">₹{p.price}</p>
                  <p className="text-gray-600 mb-2">📂 {p.category}</p>

                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleEdit(p)} className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;



