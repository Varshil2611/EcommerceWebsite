import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const userEmail = localStorage.getItem('userEmail'); // Get the email from localStorage
  const [user, setUser] = useState(null);  // Store user data from API response
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch user data when the component is mounted
  useEffect(() => {
    if (userEmail) {    
      axios.get(`http://localhost:5000/userprofile/profile/${userEmail}`)
        .then(response => {   
          setUser(response.data);
          setLoading(false);  // Stop loading once data is fetched
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setLoading(false);  // Stop loading in case of error
          setError('Failed to fetch user data. Please try again later.'); // Set error state
        });
    } else {
      setError('User email is not available.');
      setLoading(false);
    }
  }, [userEmail]);  

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div className="text-center text-red-500 font-semibold">{error}</div>;
  }

  // If no user data is found, show a message
  if (!user) {
    return <div className="text-center text-gray-500">No user data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {/* User Info */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Hello, {user.username ? capitalizeFirstLetter(user.username) : "User"}
          </h2>
          
          {/* Profile Summary Section */}
          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Total Orders:</span>
              <span>{user.totalOrders || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Total Spend:</span>
              <span>{user.totalSpend ? `$${user.totalSpend}` : "$0.00"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
