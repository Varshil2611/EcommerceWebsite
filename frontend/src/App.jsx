import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import ProductDetail from './Pages/ProductDetail';  
import Navbar from './Components/Navbar'; 
import ShopContextProvider from './Context/ShopContext';  
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import AdminDashboard from './AdminPages/AdminDashboard'; 
import ProductManagement from './AdminPages/ProductManagement'; 
import OrderManagement from './AdminPages/OrderManagement';
import Sidebar from './Components/Sidebar';
import AddProductForm from './AdminPages/AddProductForm';
import EditProductForm from './AdminPages/EditProductForm';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import PrivateRoute from './Context/PrivateRoute';  
import ThankYouPage from './Pages/ThankYouPage';
import TestProduct from './Pages/TestProduct';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const location = useLocation();

  // Check if the route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ShopContextProvider>
      {/* Render Navbar for non-admin routes */}
      {!isAdminRoute && <Navbar />} 

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path='/testproduct' element={<TestProduct />} />
        
        {/* Protected Routes */}
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/thankyou' element={<PrivateRoute><ThankYouPage /></PrivateRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout><AdminRoutes /></AdminLayout>} />

        {/* Catch-all route for invalid paths */}
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </ShopContextProvider>
  );
};

// Admin Routes Component
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Admin Dashboard */}
      <Route path="dashboard" element={<AdminDashboard />} />
      
      {/* Product Management Routes */}
      <Route path="products" element={<ProductManagement />} />
      <Route path='/products/add' element={<AddProductForm />} />
      <Route path='/products/edit/:id' element={<EditProductForm />} />
      
      {/* Order Management Routes */}
      <Route path="orders" element={<OrderManagement />} />
    </Routes>
  );
};

export default App;
