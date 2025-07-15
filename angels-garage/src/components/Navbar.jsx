import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-950 text-white p-4 fixed  top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
             <img className="size-15" src="/src/assets/images/AngelsGarage logo.png" alt="AngelsGarage Logo" />
        </div>
        {/* Hamburger icon for mobile */}
        <button
          className="lg:hidden p-2 rounded-md bg-amber-900 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
          >
            {/* Custom hamburger icon with three lines */}
            {!isOpen && (
              <g>
                <rect x="4" y="6" width="16" height="2" rx="1" fill="#222" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="#222" />
                <rect x="4" y="16" width="16" height="2" rx="1" fill="#222" />
              </g>
            )}
            {/* X icon for close */}
            {isOpen && (
              <g>
                <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </button>
        {/* Links */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto absolute top-16 left-0 bg-amber-950 lg:bg-transparent z-20 lg:static shadow-lg lg:shadow-none transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} lg:translate-x-0 lg:opacity-100 lg:relative`}
        >
          <ul className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0 p-6 lg:p-0 items-center font-semibold">
            <li><a href="/" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="/buy" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Buy</a></li>
            <li><a href="/sell" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Sell</a></li>
            <li><a href="/contact" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Contact</a></li>
          </ul>
        </div>
        {/* Backdrop for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0  backdrop-blur-sm z-10 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;