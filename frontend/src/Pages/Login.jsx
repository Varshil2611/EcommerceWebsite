// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the login request to the backend
//       const response = await axios.post("http://localhost:5000/", formData); // Adjust endpoint

//       // Capture the token and userId from the response
//       const { token, userId, email } = response.data; // Adjust the response structure as needed

//       // Store the token and userId in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);  // Store userId
//       localStorage.setItem("userEmail", email);  // Optionally store email

//       console.log("Login successful, token and userId saved to localStorage");

//       // Redirect to the home page
//       navigate("/home");
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="ml-10 mr-10 grid grid-cols-1 md:grid-cols-1 gap-0 mb-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-4 top-1/2 mt-3 transform -translate-y-1/2 cursor-pointer"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           <div className="text-center">
//             <button type="submit" className="px-6 py-3 bg-black text-white font-medium rounded-md">Submit</button>
//           </div>

//           <div className="text-center mt-3">
//             <span className="text-gray-500">
//               Create New Account{" "}
//               <Link to="/register" className="text-indigo-500 hover:underline">Register</Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Do not proceed if the form is invalid
    }

    // Show the loading effect
    setIsLoading(true);

    // Simulate a delay (this can be removed when implementing real backend request)
    setTimeout(async () => {
      try {
        // Send the login request to the backend
        const response = await API.post("/", formData); // Adjust endpoint

        // Capture the token and userId from the response
        const { token, userId, email } = response.data; // Adjust the response structure as needed

        // Store the token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId); // Store userId
        localStorage.setItem("userEmail", email); // Optionally store email

        console.log("Login successful, token and userId saved to localStorage");

        // Redirect to the home page
        navigate("/home");
      } catch (error) {
        console.error(
          "Error during login:",
          error.response?.data || error.message,
        );
      } finally {
        // Hide the loading effect after form submission or error
        setIsLoading(false);
      }
    }, 4000); // Simulated delay of 4 seconds
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border-2 border-black p-10 w-96 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
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
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
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
                className="absolute right-4 top-1/2 transform -translate-y-1/8 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className={`w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  {/* Rotating Spinner Animation */}
                  <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-500"></div>
                  <span className="ml-3">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/* Link to Register */}
          <div className="text-center mt-4">
            <span className="text-gray-500">
              Create New Account{" "}
              <Link to="/register" className="text-indigo-500 hover:underline">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
