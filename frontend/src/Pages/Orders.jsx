import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaChevronDown,
  FaChevronUp,
  FaCreditCard,
  FaPaypal,
  FaLocationArrow,
  FaPhoneSquareAlt,
} from "react-icons/fa";

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [showShippingDetails, setShowShippingDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/orders/${userId}`)
        .then((response) => {
          const sortedOrders = response.data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUserOrders(sortedOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const toggleShippingDetails = (orderId) => {
    setShowShippingDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Orders
      </h1>

      <div className="space-y-6">
        {userOrders.length > 0 ? (
          userOrders.map((order) => {
            const totalAmount = order.totalAmount.toFixed(2);

            return (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-lg p-4 border border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-800">
                    Order ID: {order.orderId}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-2 py-2 border-b border-gray-200"
                    >
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-center text-xs text-gray-500">
                        x{item.quantity}
                      </span>
                      <span className="text-xs text-right text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ${totalAmount}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-800">
                    Payment Method:
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    {order.paymentMethod === "paypal" && (
                      <FaPaypal className="mr-2 text-xs" />
                    )}
                    {order.paymentMethod === "cash" && (
                      <FaCreditCard className="mr-2 text-xs" />
                    )}
                    <span>
                      {order.paymentMethod === "paypal" ? "PayPal" : "Cash"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">
                    Status:
                  </span>
                  <div className="flex items-center space-x-1">
                    {order.status === "Shipped" && (
                      <FaTruck className="text-blue-500 text-sm" />
                    )}
                    {order.status === "Delivered" && (
                      <FaCheckCircle className="text-green-500 text-sm" />
                    )}
                    {order.status === "Pending" && (
                      <FaHourglassHalf className="text-yellow-500 text-sm" />
                    )}
                    {order.status === "Canceled" && (
                      <FaTimesCircle className="text-red-500 text-sm" />
                    )}{" "}
                    {/* Add Canceled Icon */}
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Canceled" // Styling for Canceled status
                          ? "bg-red-100 text-red-800"
                          : ""
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={() => toggleShippingDetails(order._id)}
                    className="flex items-center justify-center space-x-1 text-indigo-500 hover:text-indigo-700 transition duration-300 ease-in-out text-sm"
                  >
                    <span>
                      {showShippingDetails[order._id]
                        ? "Hide Shipping Details"
                        : "More Details"}
                    </span>
                    {showShippingDetails[order._id] ? (
                      <FaChevronUp className="transform rotate-180 transition-transform duration-300 text-sm" />
                    ) : (
                      <FaChevronDown className="transform rotate-0 transition-transform duration-300 text-sm" />
                    )}
                  </button>
                </div>

                {showShippingDetails[order._id] && (
                  <div className="mt-4">
                    <span className="font-semibold text-sm text-gray-800">
                      Shipping Details:
                    </span>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>
                        <FaLocationArrow className="inline-block mr-1 text-sm" />{" "}
                        Name: {order.shippingDetails.name}
                      </p>
                      <p>
                        <FaLocationArrow className="inline-block mr-1 text-sm" />{" "}
                        Address: {order.shippingDetails.address}
                      </p>
                      <p>
                        <FaLocationArrow className="inline-block mr-1 text-sm" />{" "}
                        City: {order.shippingDetails.city}
                      </p>
                      <p>
                        <FaLocationArrow className="inline-block mr-1 text-sm" />{" "}
                        Postal Code: {order.shippingDetails.postalCode}
                      </p>
                      <p>
                        <FaPhoneSquareAlt className="inline-block mr-1 text-sm" />{" "}
                        Phone: {order.shippingDetails.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-sm text-gray-500">
            You have no orders yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
