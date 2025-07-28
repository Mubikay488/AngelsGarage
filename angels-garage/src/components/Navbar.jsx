import React, { useState } from 'react';
import Logo from '../assets/images/angelsgaragelogo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdminLogin = () => {
    localStorage.setItem("isAdmin", "true");
    window.location.reload();
  };
  return (
    <nav className="text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg" style={{ backgroundColor: '#3B1220' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <img className="size-12 md:size-15 cursor-pointer" src={Logo} alt="AngelsGarage Logo" />
            <span className="text-lg md:text-2xl font-bold whitespace-nowrap">AngelsGarageGhana</span>
          </a>
        </div>
        {/* Hamburger icon for mobile */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: '#3B1220', border: '2px solid #3B1220' }}
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
                <rect x="4" y="6" width="16" height="2" rx="1" fill="#000" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="#000" />
                <rect x="4" y="16" width="16" height="2" rx="1" fill="#000" />
              </g>
            )}
            {/* X icon for close */}
            {isOpen && (
              <g>
                <line x1="6" y1="6" x2="18" y2="18" stroke="#3B1220" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="18" x2="18" y2="6" stroke="#3B1220" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </button>
        {/* Links */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto absolute top-16 left-0 lg:bg-transparent z-20 lg:static shadow-lg lg:shadow-none transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} lg:translate-x-0 lg:opacity-100 lg:relative`}
          style={{ backgroundColor: isOpen ? '#3B1220' : undefined }}
        >
          <ul className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0 p-6 lg:p-0 items-center font-semibold">
            <li><a href="/" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="/buy" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Buy</a></li>
            <li><a href="/sell" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Sell</a></li>
            <li><a href="/contact" className="px-7 py-3 hover:bg-white hover:text-gray-600 transition-colors duration-500 rounded-full" onClick={() => setIsOpen(false)}>Contact</a></li>
            {localStorage.getItem("isAdmin") === "true" && (
              <li>
                <a href="/admin" className="px-7 py-3 hover:bg-white hover:text-[#3B1220] transition-colors duration-500 rounded-full font-bold" onClick={() => setIsOpen(false)}>
                  Admin Dashboard
                </a>
              </li>
            )}
            <li>
              {localStorage.getItem("isAdmin") === "true" ? (
                <button
                  onClick={() => { localStorage.removeItem("isAdmin"); window.location.reload(); }}
                  className="px-7 py-3 bg-[#3B1220] border border-white text-white rounded-full font-bold hover:bg-white hover:text-[#3B1220] transition-colors duration-300 w-full text-left"
                >
                  Admin Logout
                </button>
              ) : (
                <button
                  onClick={handleAdminLogin}
                  className="px-7 py-3 bg-[#3B1220] border border-white text-white rounded-full font-bold hover:bg-white hover:text-[#3B1220] transition-colors duration-300 w-full text-left"
                >
                  Admin Login
                </button>
              )}
            </li>
          </ul>
        </div>
        {/* Admin Login Button moved into nav links */}
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