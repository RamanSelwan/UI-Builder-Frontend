import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/header");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-500 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-500 mb-6">Login to your E-Shop account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-gray-50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-gray-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-orange-500 font-semibold text-sm focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold py-2 rounded-lg shadow-md hover:from-orange-500 hover:to-pink-500 transition"
          >
            Login
          </button>
          <div className="mt-3 flex justify-center text-sm text-gray-500">
            <a
              href="#"
              className="text-orange-500 font-semibold hover:underline"
            >
              Forgot Password?
            </a>
            <span className="mx-2">|</span>
            <a
              href="#"
              className="text-orange-500 font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;