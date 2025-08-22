
import React from 'react';

const Footer = () => (
  <footer className="relative mt-20 bg-gradient-to-br from-green-100 via-green-50 to-white text-green-900">
    {/* Top wave curve */}
    <div className="absolute -top-6 left-0 w-full overflow-hidden leading-0 rotate-180">
      <svg
        className="relative block w-[calc(100%+1.3px)] h-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M321.39 56.44C182.26 93.62 0 30 0 30V120h1200V0s-68.42 39.9-228.47 59.87C812.69 93.85 689.81 7.91 556.43 40.41 461.89 65.06 401.47 89.73 321.39 56.44z"
          fill="#bbf7d0"
        />
      </svg>
    </div>

    {/* Footer content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-center animate-fadeIn">
      <p className="text-xl text-green-900 mt-2">
        Fresh. Local. Seasonal. Straight from the soil 🌱
      </p>
    </div>
  </footer>
);

export default Footer;
