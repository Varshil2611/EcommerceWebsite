import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = () => {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/status-summary");
        setOrderStatus(response.data.statusSummary || []);
      } catch (error) {
        console.error("Error fetching order status summary:", error);
      }
    };

    fetchData();
  }, []);

  if (!orderStatus.length) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg">Order Status Overview</h3>
        <p className="mt-4">No order data available.</p>
      </div>
    );
  }

  const data = {
    labels: orderStatus.map((item) => item.status),
    datasets: [
      {
        label: "Order Status",
        data: orderStatus.map((item) => item.count),
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"], // Green, Yellow, Red
        hoverBackgroundColor: ["#388E3C", "#FFA000", "#D32F2F"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const item = orderStatus[tooltipItem.dataIndex];
            return [`${item.status}: ${item.count} Orders`, `(${item.percentage}%)`];
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg text-center mb-4">Order Status Overview</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default OrderStatusChart;
