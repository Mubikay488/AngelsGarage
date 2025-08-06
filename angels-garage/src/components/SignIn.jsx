import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ADMIN_CREDENTIALS = {
  username: "Mubarak",
  password: "Mubikay488"
};

const SignIn = () => {
  const [role, setRole] = useState("");
  const [sellerMode, setSellerMode] = useState("signin"); // 'signin' or 'register'
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Helper to get seller accounts from localStorage
  const getSellerAccounts = () => {
    const sellers = localStorage.getItem("sellerAccounts");
    return sellers ? JSON.parse(sellers) : [];
  };

  // Helper to save seller accounts
  const saveSellerAccounts = (accounts) => {
    localStorage.setItem("sellerAccounts", JSON.stringify(accounts));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (r) => {
    setRole(r);
    setError("");
    setForm({ fullName: "", email: "", username: "", password: "", phone: "" });
    setSellerMode("signin");
  };

  const handleSellerMode = (mode) => {
    setSellerMode(mode);
    setError("");
    setForm({ fullName: "", email: "", username: "", password: "", phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      if (
        form.username === ADMIN_CREDENTIALS.username &&
        form.password === ADMIN_CREDENTIALS.password
      ) {
        localStorage.setItem("isAdmin", "true");
        localStorage.removeItem("isSeller");
        navigate("/admin");
      } else {
        setError("Invalid admin credentials.");
      }
    } else if (role === "seller") {
      if (sellerMode === "register") {
        if (!form.fullName || !form.email || !form.username || !form.password || !form.phone) {
          setError("All fields are required.");
          return;
        }
      } else {
        if (!form.username || !form.password) {
          setError("Username and password required.");
          return;
        }
      }
      const accounts = getSellerAccounts();
      if (sellerMode === "signin") {
        const found = accounts.find(
          (acc) => acc.username === form.username && acc.password === form.password
        );
        if (found) {
          localStorage.setItem("isSeller", "true");
          localStorage.setItem("sellerUsername", form.username);
          localStorage.removeItem("isAdmin");
          navigate("/sell");
        } else {
          setError("Invalid seller credentials.");
        }
      } else if (sellerMode === "register") {
        const exists = accounts.some((acc) => acc.username === form.username);
        if (exists) {
          setError("Username already taken.");
        } else {
          accounts.push({
            fullName: form.fullName,
            email: form.email,
            username: form.username,
            password: form.password,
            phone: form.phone
          });
          saveSellerAccounts(accounts);
          localStorage.setItem("isSeller", "true");
          localStorage.setItem("sellerUsername", form.username);
          localStorage.removeItem("isAdmin");
          navigate("/sell");
        }
      }
    }
  };

  // Check if signed in as admin or seller
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isSeller = localStorage.getItem("isSeller") === "true";

  const handleSignOut = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isSeller");
    localStorage.removeItem("sellerUsername");
    localStorage.removeItem("sellerPassword");
    navigate("/signin");
    setRole("");
    setSellerMode("signin");
    setForm({ username: "", password: "" });
    setError("");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        {(isAdmin || isSeller) ? (
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="text-lg font-semibold mb-4">
              {isAdmin ? `Signed in as Admin (${ADMIN_CREDENTIALS.username})` : `Signed in as Seller (${localStorage.getItem("sellerUsername")})`}
            </div>
            <button
              className="px-6 py-2 rounded bg-[#3B1220] text-white font-bold hover:bg-[#4c1a2a] transition-colors"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded font-bold border cursor-pointer ${role === "admin" ? "bg-[#3B1220] text-white" : "bg-gray-100 text-[#3B1220]"}`}
                  onClick={() => handleRoleSelect("admin")}
                >
                  Admin
                </button>
                <button
                  className={`px-4 py-2 rounded font-bold border cursor-pointer ${role === "seller" ? "bg-[#3B1220] text-white" : "bg-gray-100 text-[#3B1220]"}`}
                  onClick={() => handleRoleSelect("seller")}
                >
                  Seller
                </button>
              </div>
              {role === "seller" && (
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    className={`px-3 py-1 rounded border font-semibold cursor-pointer ${sellerMode === "signin" ? "bg-[#3B1220] text-white" : "bg-gray-100 text-[#3B1220]"}`}
                    onClick={() => handleSellerMode("signin")}
                  >
                    Sign In
                  </button>
                  <button
                    className={`px-3 py-1 rounded border font-semibold cursor-pointer ${sellerMode === "register" ? "bg-[#3B1220] text-white" : "bg-gray-100 text-[#3B1220]"}`}
                    onClick={() => handleSellerMode("register")}
                  >
                    Register
                  </button>
                </div>
              )}
              {role && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {role === "seller" && sellerMode === "register" && (
                    <>
                      <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B1220]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B1220]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B1220]"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block font-semibold mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B1220]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B1220] pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-sm text-[#3B1220] bg-gray-100 px-2 py-1 rounded"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  {error && <div className="text-red-500 mb-2">{error}</div>}
                  <button
                    type="submit"
                    className="w-full py-2 text-white rounded font-semibold"
                    style={{ backgroundColor: '#3B1220' }}
                  >
                    {role === "seller" && sellerMode === "register" ? "Register" : "Sign In"}
                  </button>
                </form>
              )}
              {!role && (
                <div className="text-gray-500 text-center">Select a role to continue.</div>
              )}
            </div>
            <div className="mt-6 text-center text-gray-500 text-sm">
              {role === "admin" && (
                <span>Admin credentials: <span className="font-bold">Mubarak / Mubikay488</span></span>
              )}
              {role === "seller" && sellerMode === "register" && (
                <span>Register as a seller with a unique username and password.</span>
              )}
              {role === "seller" && sellerMode === "signin" && (
                <span>Sign in with your seller account.</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
