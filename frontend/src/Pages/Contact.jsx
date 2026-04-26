import { useState } from 'react';
import API from '../api/axios';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.post("/api/contact", formData);
      console.log("Submitted Contact Data -", response.data); 
      } 
    catch (error) {
      console.error("Error during registration:", error.response?.data || error.message); 
    }
    console.log('Form Submitted', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Contact Us</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-600 mb-4">We’re here to help! Feel free to reach out.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>Select Subject</option>
              <option value="Product Inquiry">Product Inquiry</option>
              <option value="Shipping & Delivery">Shipping & Delivery</option>
              <option value="Returns & Exchanges">Returns & Exchanges</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
  <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Customer Service</h2>
  
  <div className="text-center text-gray-600">
    <p className="mb-2">Customer Service Hours:</p>
    <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
    <p className="mb-2">Saturday: 10:00 AM - 2:00 PM (EST)</p>
    <p className="mb-4">Sunday: Closed</p>
    
    <p className="mb-2">Phone: <a href="tel:+18001234567" className="text-indigo-600">1-800-123-4567</a></p>
    <p>Email: <a href="mailto:support@yourstore.com" className="text-indigo-600">support@yourstore.com</a></p>
  </div>
</div>

    </div>
  );
};

export default Contact;
