import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = `
.ad-scroll::-webkit-scrollbar {
  display: none;
}
`;

const Home = () => {
  const { user } = useAuth(); // ✅ get logged-in user
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce1-tq6e.onrender.com/api/products/getallproduct"
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching products", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="pt-[80px] bg-gradient-to-br from-gray-50 to-green-50 min-h-screen font-sans text-gray-800">
{/* Decorative Top Curve */}
<div className="w-full overflow-hidden -mt-24">
  <svg
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    className="w-full h-[160px]"
  >
    <path
      d="M0,100 C150,250 350,-100 500,100 L500,0 L0,0 Z"
      style={{ stroke: "none", fill: "#d1fae5" }}
    ></path>
  </svg>
</div>

{/* Hero Section */}
<motion.section
  className="relative text-center px-6 pt-2 pb-2 -mt-12 overflow-hidden"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px] bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>

  <motion.div
    className="text-5xl mb-4 relative z-10"
    initial={{ rotate: -10, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    🍃
  </motion.div>

  <motion.h1
    className="text-3xl sm:text-4xl font-extrabold text-green-800 mb-2 z-10 relative drop-shadow"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <span className="text-green-600">Welcome to AgroConnect</span>
  </motion.h1>

  <motion.p
    className="text-sm sm:text-base text-gray-600 z-10 relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7, duration: 1 }}
  >
    Where freshness meets trust – connect with local farms & bring nature home 🌾
  </motion.p>

  <motion.div
    className="mt-2 flex justify-center z-10 relative"
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
  >
    <svg width="140" height="18" viewBox="0 0 150 20" fill="none">
      <path
        d="M5 10C30 25 120 -5 145 10"
        stroke="#34d399"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>
</motion.section>



        {/* Carousel */}
        <motion.section
          className="px-6 pt-2 pb-6"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            className="rounded-xl shadow-lg"
          >
            {[
              { img: "https://kj1bcdn.b-cdn.net/media/67541/spinach.jpg" },
              {
                img: "https://img.freepik.com/premium-photo/farm-dairy-products-table-selective-focus_73944-55479.jpg?semt=ais_hybrid&w=740&q=80",
              },
              {
                img: "https://www.dobies.co.uk/product_images/KC7067-KC7073.jpg",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <img
                  src={item.img}
                  alt="carousel slide"
                  className="rounded-xl h-[450px] object-cover"
                />
              </div>
            ))}
          </Carousel>
        </motion.section>

        {/* Category */}
        <section className="px-6 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center text-sm">
            {[
              { label: "Fruits", icon: "🍎", bg: "from-pink-100 to-red-200" },
              { label: "Veggies", icon: "🥦", bg: "from-green-100 to-emerald-200" },
              { label: "Grains", icon: "🌾", bg: "from-yellow-100 to-amber-200" },
              { label: "Dairy", icon: "🥛", bg: "from-blue-100 to-indigo-200" },
              {
                label: "Dry Fruits & Nuts",
                icon: "🥜",
                bg: "from-orange-100 to-rose-200",
              },
              { label: "Pulses", icon: "🫘", bg: "from-purple-100 to-fuchsia-100" },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={`/products?category=${item.label.toLowerCase()}`}
                className={`bg-gradient-to-br ${item.bg} text-green-800 rounded-xl shadow p-4 hover:scale-105 hover:brightness-110 transition-all flex flex-col items-center`}
              >
                <span className="text-2xl drop-shadow">{item.icon}</span>
                <span className="mt-1 font-semibold drop-shadow">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="px-6 py-10">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            🛍️ Our Products
          </h2>

          {loading ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                  <Link to={`/products/${product._id}`} key={product._id}>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:ring-2 hover:ring-green-400 overflow-hidden transition duration-100 h-full flex flex-col">
                      <div className="relative h-56 bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                          ₹{product.price}
                        </span>
                        <span className="absolute top-2 right-2 bg-white text-gray-700 text-xs px-2 py-0.5 rounded-full border border-gray-300 capitalize">
                          {product.category}
                        </span>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 leading-snug mb-1 truncate">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {product.description || "No description available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {products.length > 8 && (
                <div className="mt-10 text-center">
                  <Link
                    to="/products"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-700 shadow-md transition-transform hover:scale-105"
                  >
                    See More Products →
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* Footer CTA */}
        <section className="px-6 py-10 bg-gradient-to-br from-green-100 to-emerald-100 shadow-inner">
          <div className="relative max-w-7xl mx-auto rounded-3xl bg-white/60 backdrop-blur-md shadow-md p-4 sm:p-8 flex flex-col-reverse sm:flex-row items-center justify-between overflow-hidden">
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-pink-200 rounded-full blur-2xl opacity-25"></div>
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-red-100 rounded-full blur-2xl opacity-25"></div>

            <div className="z-10 sm:w-1/2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2 leading-snug">
                Eat fresh. Live better 🍓
              </h3>
              <p className="text-green-700 text-sm mb-4">
                Farm-picked goodness, straight to you.
              </p>
              <Link
                to="/products"
                className="inline-block bg-green-600 text-white font-medium px-5 py-2.5 rounded-full hover:bg-green-700 transition-transform hover:scale-105 shadow-sm"
              >
                Explore
              </Link>
            </div>

            <div className="z-10 mb-6 sm:mb-0 sm:w-1/2 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                alt="fresh strawberry"
                className="w-28 sm:w-36 drop-shadow-sm"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;





