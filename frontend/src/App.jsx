import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
import NotFound from './Pages/NotFound';
import { Toaster } from "react-hot-toast";
import { AdminRoute } from "./Components/ProtectedRoute"; 

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
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <ShopContextProvider>

      <Toaster position="top-right" />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Auth */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Main Pages */}
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path='/testproduct' element={<TestProduct />} />

        {/* User Protected Routes */}
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/thankyou' element={<PrivateRoute><ThankYouPage /></PrivateRoute>} />

        {/* ✅ Admin Protected Routes */}
        <Route path="/admin/*" element={
          <AdminRoute>
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          </AdminRoute>
        } />

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>

    </ShopContextProvider>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/add" element={<AddProductForm />} />
      <Route path="products/edit/:id" element={<EditProductForm />} />
      <Route path="orders" element={<OrderManagement />} />
    </Routes>
  );
};

export default App;