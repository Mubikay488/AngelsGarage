import React, { useState } from 'react';

function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isSeller = localStorage.getItem("isSeller") === "true";

  const handleAdminLogin = () => {
    localStorage.setItem("isAdmin", "true");
    localStorage.removeItem("isSeller");
    window.location.reload();
  };
  const handleSellerLogin = () => {
    localStorage.setItem("isSeller", "true");
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isSeller");
    window.location.reload();
  };

  return (
    <div className="relative">
      {(isAdmin || isSeller) ? (
        <button
          onClick={handleLogout}
          className="px-7 py-3 bg-[#3B1220] border border-white text-white rounded-full font-bold hover:bg-white hover:text-[#3B1220] transition-colors duration-300 w-full text-left"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className="px-7 py-3 bg-[#3B1220] border border-white text-white rounded-full font-bold hover:bg-white hover:text-[#3B1220] transition-colors duration-300 w-full text-left"
        >
          Login
        </button>
      )}
      {open && !isAdmin && !isSeller && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <button
            onClick={handleAdminLogin}
            className="block w-full px-4 py-2 text-left hover:bg-[#3B1220] hover:text-white"
          >
            Login as Admin
          </button>
          <button
            onClick={handleSellerLogin}
            className="block w-full px-4 py-2 text-left hover:bg-[#3B1220] hover:text-white"
          >
            Login as Seller
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginDropdown;
