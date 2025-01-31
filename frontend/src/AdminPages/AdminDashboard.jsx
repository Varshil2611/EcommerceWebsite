import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0); // State to store the total products
  const [totalOrders, setTotalOrders] = useState(350);  // You can later update this dynamically
  const [totalRevenue, setTotalRevenue] = useState(14500); // Similarly, this can be fetched dynamically

  // Fetch total products from the backend
  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('/api/products/total');
        setTotalProducts(response.data.totalProducts); // Update state with total products
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts(); // Call the function to fetch total products
  }, []); // Empty array means this will only run once when the component mounts

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Products */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg">Total Products</h3>
        <p className="text-3xl font-bold">{totalProducts}</p>
      </div>

      {/* Total Orders */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg">Total Orders</h3>
        <p className="text-3xl font-bold">{totalOrders}</p>
      </div>

      {/* Total Revenue */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg">Total Revenue</h3>
        <p className="text-3xl font-bold">${totalRevenue}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
