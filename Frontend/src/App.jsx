
// import { Routes, Route, useLocation } from "react-router-dom";

// import Navbar from "./Component/Navbar";
// import Footer from "./Component/Footer";
// import Home from "./Pages/Home";
// import Products from "./Pages/Products";
// import ProductDetails from "./Pages/ProductDetails";
// import { Search } from "./Pages/Search";
// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";

// import Cart from "./dashboard/customer/Cart";
// import Checkout from "./dashboard/customer/Checkout";

// import CustomerDashboard from "./dashboard/customer/CustomerDashboard";
// import SellerDashboard from "./dashboard/seller/SellerDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";

// import SellerProfile from "./dashboard/seller/Profile";
// import SellerProducts from "./dashboard/seller/ProductList";
// import AddProduct from "./dashboard/seller/AddProduct";
// import SellerOrders from "./dashboard/seller/SellerOrders";

// import SellerMessages from "./dashboard/seller/SellerMessages";

// import Orders from "./dashboard/customer/Orders";
// import Profile from "./dashboard/customer/Profile";
// import Recommended from "./dashboard/customer/Recommended";
// import Wallet from "./dashboard/customer/Wallet";
// import HelpContact from "./dashboard/customer/HelpContact";
// import Wishlist from "./dashboard/customer/Wishlist";
// import WhyUs from "./Pages/WhyUs";

// const App = () => {
//   const location = useLocation();

//   const isDashboard =
//     location.pathname.startsWith("/seller/dashboard") ||
//     location.pathname.startsWith("/customer/dashboard");

//   return (
//     <>
//       {!isDashboard && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/why-us" element={<WhyUs />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Customer Dashboard Routes */}
//         <Route
//           path="/customer/dashboard/*"
//           element={
//             <ProtectedRoute role="customer">
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="orders" element={<Orders />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="recommended" element={<Recommended />} />
//           <Route path="wallet" element={<Wallet />} />
//           <Route path="help-contact" element={<HelpContact />} />
//           <Route path="cart" element={<Cart />} />
//           <Route path="wishlist" element={<Wishlist />} />

//           {/* ✅ Checkout nested inside customer dashboard */}
//           <Route path="checkout" element={<Checkout />} />
//         </Route>

//         {/* Seller Dashboard Routes */}
//         <Route
//           path="/seller/dashboard/*"
//           element={
//             <ProtectedRoute role="seller">
//               <SellerDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="profile" element={<SellerProfile />} />
//           <Route path="add-product" element={<AddProduct />} />
//           <Route path="products" element={<SellerProducts />} />
//           <Route path="orders" element={<SellerOrders />} />
         
//           <Route path="SellerMessages" element={<SellerMessages />} />
//         </Route>
//       </Routes>

//       {!isDashboard && <Footer />}
//     </>
//   );
// };

// export default App;
// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation as useRouterLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import { Search } from "./Pages/Search";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import Cart from "./dashboard/customer/Cart";
import Checkout from "./dashboard/customer/Checkout";
import CustomerDashboard from "./dashboard/customer/CustomerDashboard";
import SellerDashboard from "./dashboard/seller/SellerDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProfile from "./dashboard/seller/Profile";
import SellerProducts from "./dashboard/seller/ProductList";
import AddProduct from "./dashboard/seller/AddProduct";
import SellerOrders from "./dashboard/seller/SellerOrders";
import SellerMessages from "./dashboard/seller/SellerMessages";
import Orders from "./dashboard/customer/Orders";
import Profile from "./dashboard/customer/Profile";
import Recommended from "./dashboard/customer/Recommended";
import Wallet from "./dashboard/customer/Wallet";
import HelpContact from "./dashboard/customer/HelpContact";
import Wishlist from "./dashboard/customer/Wishlist";
import WhyUs from "./Pages/WhyUs";

import { AuthProvider, useAuth } from "./context/AuthContext";

// This component handles login + showing location
const AppContent = () => {
  const location = useRouterLocation();
  const { login, user } = useAuth();
  const [userLocation, setUserLocation] = useState("");

  const isDashboard =
    location.pathname.startsWith("/seller/dashboard") ||
    location.pathname.startsWith("/customer/dashboard");

  // Function to get location via IP API
  const fetchLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setUserLocation(`${data.city}, ${data.region}`);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Handle login and fetch location
  const handleLogin = () => {
    login({ name: "Manjiree" });
    fetchLocation();
  };

  // If already logged in on reload, fetch location
  useEffect(() => {
    if (user) {
      fetchLocation();
    }
  }, [user]);

  return (
    <>
      {!isDashboard && <Navbar locationName={userLocation} />}
      {!user && (
        <button
          style={{ margin: "20px", padding: "10px" }}
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer Dashboard */}
        <Route
          path="/customer/dashboard/*"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recommended" element={<Recommended />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="help-contact" element={<HelpContact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Seller Dashboard */}
        <Route
          path="/seller/dashboard/*"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<SellerProfile />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="SellerMessages" element={<SellerMessages />} />
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;



