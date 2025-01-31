import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();  // Get the current location

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-2 p-2 rounded-md ${
              location.pathname === '/admin/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/products"
            className={`flex items-center space-x-2 p-2 rounded-md ${
              location.pathname === '/admin/products' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaBox />
            <span>Products</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/orders"
            className={`flex items-center space-x-2 p-2 rounded-md ${
              location.pathname === '/admin/orders' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/"
            className={`flex items-center space-x-2 p-2 rounded-md ${
              location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
