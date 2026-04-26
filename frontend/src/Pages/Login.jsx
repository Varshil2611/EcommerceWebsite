import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsLoading(true);
  setLoginError("");

  try {
    const response = await API.post("/", formData);
    const { token, userId, email, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (userId) localStorage.setItem("userId", userId);
    if (email) localStorage.setItem("userEmail", email);

    // ✅ Direct navigate — no setTimeout
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }

  } catch (error) {
    setLoginError("Invalid email or password. Please try again.");
    console.error("Error during login:", error.response?.data || error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-black p-10 w-96 shadow-lg">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">Login</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Welcome back! Sign in to continue</p>

        {/* Login Error */}
        {loginError && (
          <div className="mb-4 px-4 py-2 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black pr-10"
                required
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
              >
                {passwordVisible ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                isLoading ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">
            Don`&apos`t have an account?{" "}
            <Link to="/register" className="text-gray-800 font-semibold hover:underline">
              Register
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;