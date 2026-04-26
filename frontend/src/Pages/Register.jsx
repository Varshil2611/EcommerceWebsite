import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setRegisterError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    try {
      const response = await API.post("/register", formData);
      console.log("Registered:", response.data);
      navigate("/");
    } catch (error) {
      setRegisterError("Registration failed. Please try again.");
      console.error("Error during registration:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-black p-10 w-96 shadow-lg">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">Register</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Create your account to get started</p>

        {/* Register Error */}
        {registerError && (
          <div className="mb-4 px-4 py-2 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
            {registerError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>

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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-gray-800 font-semibold hover:underline">
              Sign In
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Register;