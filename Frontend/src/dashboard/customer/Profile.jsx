

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaEdit, FaSave } from "react-icons/fa";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-gray-200 to-gray-100">
        <div className="w-20 h-20 border-4 border-[#3B7A57] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-gray-200 to-gray-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_#3B7A57]">
        
        {/* Avatar */}
        <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#3B7A57] text-5xl font-bold shadow-xl transform transition-transform duration-500 hover:scale-110">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        {editMode ? (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-3xl font-extrabold text-[#3B7A57] text-center mb-2 border-b-2 border-green-300 outline-none w-full"
          />
        ) : (
          <h2 className="text-4xl font-extrabold text-[#3B7A57] mb-3">{user.name}</h2>
        )}

        {/* Email */}
        <p className="text-lg text-gray-600 mb-1 flex items-center justify-center gap-2">
          <FaEnvelope className="text-green-600" />
          {editMode ? (
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 border-green-300 outline-none w-full text-center"
            />
          ) : (
            user.email
          )}
        </p>

        {/* Phone */}
        <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
          <FaPhone className="text-green-600" />
          {editMode ? (
            <input
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              className="border-b-2 border-green-300 outline-none w-full text-center"
            />
          ) : (
            user.phone || "N/A"
          )}
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {editMode ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
            >
              <FaSave />
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
