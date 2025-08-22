import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SellerSidebar from "./components/SellerSidebar";

import Profile from "./Profile";
import ProductList from "./ProductList";
import Orders from "./SellerOrders";
import SellerMessages from "./SellerMessages";
import AddProduct from "./AddProduct";

const SellerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SellerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content */}
      <main
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Routes>
          <Route index element={<Profile />} /> {/* Default page */}
          <Route path="profile" element={<Profile />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="seller-messages" element={<SellerMessages />} />
        </Routes>
      </main>
    </div>
  );
};

export default SellerDashboard;
