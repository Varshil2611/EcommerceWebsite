import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({ statusSummary = [] }) => {
  if (!statusSummary || statusSummary.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg text-center">
        <h3 className="text-md">Order Status Overview</h3>
        <p className="mt-2 text-sm">No order data available.</p>
      </div>
    );
  }

  // Updated order statuses and their corresponding colors
  const statusColors = {
    "Delivered": "#2ECC71",  // Green
    "Shipped": "#36A2EB",  // Blue
    "Pending": "#FFCE56",  // Yellow
    "Canceled": "#E74C3C",  // Red
    "Processing": "#4BC0C0",  // Teal
    "Returned": "#A569BD",  // Purple
    "Unknown": "#95A5A6"  // Gray (fallback)
  };

  // Extract labels and counts
  const labels = statusSummary.map(item => item.status || "Unknown");
  const dataCounts = statusSummary.map(item => item.count || 0);

  // Assign colors dynamically based on status
  const backgroundColors = labels.map(status => statusColors[status] || statusColors["Unknown"]);
  const hoverColors = backgroundColors.map(color => color.replace(")", ", 0.8)")); // Slightly transparent on hover

  const data = {
    labels,
    datasets: [
      {
        label: "Order Count",
        data: dataCounts,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color:"white",
          font: { size: 13 },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-md mb-2">Order Status Overview</h3>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default OrderStatusChart;
