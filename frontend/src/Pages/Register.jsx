import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      console.log("Submitted Register Data -", response.data); 
      navigate('/');
      
      // You could redirect the user to login page or reset the form here
      // Example: window.location.href = '/login'; or reset formData
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message); // Handle errors
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="ml-10 mr-10 grid grid-cols-1 md:grid-cols-1 gap-0 mb-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
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

          <div className="text-center mb-4">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium rounded-md"
            >
              Submit
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-500">
              Have an Account?{" "}
              <Link to="/" className="text-indigo-500 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
