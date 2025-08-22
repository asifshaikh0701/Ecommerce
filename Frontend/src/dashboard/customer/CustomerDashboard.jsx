
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CustomerSidebar from "./components/CustomerSidebar";

import Orders from "./Orders";
import Profile from "./Profile";
import Recommended from "./Recommended";
import Wallet from "./Wallet";
import HelpContact from "./HelpContact";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Checkout from "./Checkout";

const CustomerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <CustomerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content */}
      <main
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Routes>
          <Route index element={<Orders />} /> {/* Default page */}
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recommended" element={<Recommended />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="help-contact" element={<HelpContact />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard;
