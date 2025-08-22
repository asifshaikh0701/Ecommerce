import React from "react";
import { FaPhone, FaEnvelope, FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";

const HelpContact = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100">
      {/* Header */}
      <div className="bg-green-100 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2 text-green-800 flex items-center gap-2">
          <FaRegCommentDots className="text-green-700" />
          Help & Contact
        </h2>
        <p className="text-gray-700">
          We're here to assist you. Find answers or reach out directly below.
        </p>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-green-700">Contact Us</h3>
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-gray-800">
            <FaPhone className="text-green-600" />
            <span>+91 98765 43210</span>
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <FaEnvelope className="text-green-600" />
            <span>help@agroconnect.in</span>
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-green-700">Frequently Asked Questions</h3>
        <ul className="space-y-3">
          <li>
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <FaQuestionCircle className="text-green-600" />
              How can I track my order?
            </p>
            <p className="text-sm text-gray-600 ml-6">Go to the 'Orders' section in your dashboard to view order status.</p>
          </li>
          <li>
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <FaQuestionCircle className="text-green-600" />
              Can I cancel or modify my order?
            </p>
            <p className="text-sm text-gray-600 ml-6">Yes, but only before the product is dispatched.</p>
          </li>
          <li>
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <FaQuestionCircle className="text-green-600" />
              How do I contact the farmer?
            </p>
            <p className="text-sm text-gray-600 ml-6">Reach out through your order page or use the support contacts above.</p>
          </li>
        </ul>
      </div>

      {/* Message Form */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-green-700">Send a Message</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
          ></textarea>
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpContact;
