import React from 'react';
import { Navigate } from 'react-router-dom';

// This component protects routes by checking if a token exists in localStorage
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If no token exists, redirect to login page
    if (!token) {
        return <Navigate to="/" />;
    }

    // If token exists, render the protected page
    return children;
};

export default PrivateRoute;
