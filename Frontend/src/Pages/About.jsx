


import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 px-4 md:px-8 bg-[#fef9f6] min-h-screen flex items-center justify-center">
      {/* Colored Rectangular Card */}
      <motion.div
        className="w-full max-w-5xl bg-[#e7f6ec] rounded-xl shadow-xl p-6 md:p-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">About Us</h1>
            <p className="text-gray-800 mb-4 leading-relaxed text-lg">
              We connect local farmers directly with customers. Our goal is simple — support local, eat healthy.
            </p>
            <p className="text-gray-800 text-lg">
              Join us in creating a transparent and sustainable marketplace.
            </p>

            {/* Contact Info */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Contact Us</h2>
              <p className="text-gray-800 mb-1">📧 support@farmmarket.com</p>
              <p className="text-gray-800">📞 +91 98765 43210</p>
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://img.freepik.com/premium-photo/garden-vegetables_100787-479.jpg"
              alt="Farm Produce"
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
