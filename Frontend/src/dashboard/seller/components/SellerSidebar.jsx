import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaPlusSquare,
  FaListAlt,
  FaSignOutAlt,
  FaBars,
  FaComments,
} from "react-icons/fa";

const SellerSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { path: "/seller/dashboard/profile", label: "Profile", icon: <FaUser /> },
    { path: "/seller/dashboard/add-product", label: "Add Product", icon: <FaPlusSquare /> },
    { path: "/seller/dashboard/productlist", label: "My Products", icon: <FaBoxOpen /> },
    { path: "/seller/dashboard/orders", label: "Order List", icon: <FaListAlt /> },
    { path: "/seller/dashboard/seller-messages", label: "Messages", icon: <FaComments /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white/60 backdrop-blur-lg shadow-xl border-r border-gray-200 transition-all duration-300 flex flex-col justify-between z-50 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header & Collapse Button */}
      <div>
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-4`}>
          {!collapsed && (
            <h2 className="text-xl font-bold text-green-800">🛍 Seller</h2>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-green-800">
            <FaBars />
          </button>
        </div>

        {/* Seller Info */}
        {!collapsed && user && (
          <div className="flex flex-col items-center p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#3B7A57] text-2xl font-bold shadow-md mb-2">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
            <h3 className="text-green-900 font-semibold">
              {user?.name?.split(" ")[0] || "Seller"}
            </h3>
            <p className="text-sm text-gray-600">Seller</p>
          </div>
        )}

        {/* Back to Homepage */}
        <div className="px-2 mb-2">
          <Link
            to="/"
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200 font-medium`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 4.5l9 5.25M4.5 10.5v8.25h15V10.5M9 21h6" />
            </svg>
            {!collapsed && <span>Back to Home</span>}
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2 px-2 mt-4">
          {navItems.map(({ path, label, icon }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <li key={label}>
                <Link
                  to={path}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-4 py-2 rounded-lg font-medium ${
                    isActive
                      ? "bg-green-300 text-green-900"
                      : "text-gray-700 hover:bg-green-100"
                  } transition duration-200`}
                >
                  {icon}
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-2">
        <button
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } w-full text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition duration-200`}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SellerSidebar;
