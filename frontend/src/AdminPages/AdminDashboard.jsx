import { useEffect, useState } from "react";
import OrderStatusChart from "../ChartPages/OrderStatusChart";
import API from "../api/axios";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statusSummary, setStatusSummary] = useState([]);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const productResponse = await API.get("/products/total");
      setTotalProducts(productResponse.data.totalProducts);
    } catch (error) {
      console.error("❌ /products/total failed:", error.response?.data);
    }

    try {
      const orderResponse = await API.get("/orders");
      setTotalOrders(orderResponse.data.totalOrders);
      setTotalRevenue(orderResponse.data.totalRevenue);
    } catch (error) {
      console.error("❌ /orders failed:", error.response?.data);
    }

    try {
      const statusResponse = await API.get("/orders/status-overview");
      setStatusSummary(statusResponse.data.statusSummary || []);
    } catch (error) {
      console.error("❌ /orders/status-overview failed:", error.response?.data);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>

        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${totalRevenue}</p>
        </div>
      </div>

      <div className="mt-6">
        <OrderStatusChart statusSummary={statusSummary} />
      </div>
    </div>
  );
};

export default AdminDashboard;
