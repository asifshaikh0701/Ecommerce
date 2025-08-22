import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ecommerce1-tq6e.onrender.com/api/auth/login", form);
      const { token, user, role } = res.data;

      localStorage.setItem("token", token);
      login(user);

      if (role === "seller") {
        navigate("/seller/dashboard/profile");
      } else {
        navigate("/customer/dashboard/profile");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 via-green-50 to-white relative overflow-hidden">
      {/* Decorative Curves */}
      <svg
        className="absolute top-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#bbf7d0" // pastel green
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,149.3C384,139,480,85,576,101.3C672,117,768,203,864,224C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-4 pt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center text-green-500 mb-6"
          >
            Login
          </motion.h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-green-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-green-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
            >
              Login
            </motion.button>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-green-700 font-semibold hover:underline"
                >
                  Signup
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

