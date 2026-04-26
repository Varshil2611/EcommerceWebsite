import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaGift } from 'react-icons/fa';
import { ShopContext } from '../Context/ShopContext'; 

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(ShopContext);

  useEffect(() => {
  
    localStorage.removeItem('cart');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    
    
    clearCart();
  }, []);

  const handleContinueShopping = () => {
    console.log('Continue Shopping clicked');
    navigate('/collection');
  };

  const handleGoHome = () => {
    console.log('Go to Homepage clicked');
    navigate('/home');
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      {/* Thank you message with gift icon */}
      <div className="text-center mb-6 space-y-4">
        <FaGift className="mx-auto text-6xl text-green-500 mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-600">
          Your order has been placed successfully.
        </p>
      </div>

      {/* Action buttons section */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
        <button
          onClick={handleContinueShopping}
          className="bg-gray-800 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-700 transform hover:scale-105 transition duration-200 ease-in-out shadow-lg"
        >
          <FaShoppingCart className="text-xl" />
          <span className="font-semibold">Continue Shopping</span>
        </button>

        <button
          onClick={handleGoHome}
          className="bg-gray-800 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-700 transform hover:scale-105 transition duration-200 ease-in-out shadow-lg"
        >
          <FaHome className="text-xl" />
          <span className="font-semibold">Go to Homepage</span>
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          If you have any questions about your order, feel free to{' '}
          <a href="mailto:support@yourstore.com" className="text-blue-500 hover:underline">
            contact us
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
