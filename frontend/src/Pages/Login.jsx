import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:5000/", formData); // Adjust endpoint

      // Capture the token and userId from the response
      const { token, userId, email } = response.data; // Adjust the response structure as needed

      // Store the token and userId in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);  // Store userId
      localStorage.setItem("userEmail", email);  // Optionally store email

      console.log("Login successful, token and userId saved to localStorage");

      // Redirect to the home page
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="ml-10 mr-10 grid grid-cols-1 md:grid-cols-1 gap-0 mb-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 mt-3 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="px-6 py-3 bg-black text-white font-medium rounded-md">Submit</button>
          </div>

          <div className="text-center mt-3">
            <span className="text-gray-500">
              Create New Account{" "}
              <Link to="/register" className="text-indigo-500 hover:underline">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
