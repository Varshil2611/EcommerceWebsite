import { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FaPaypal, FaMoneyBillWave } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';  // Import useNavigate
import API from '../api/axios';

const CheckoutPage = () => {
  const { cart, currency, deliveryfee } = useContext(ShopContext);
  const userEmail = localStorage.getItem('userEmail'); // Get the email from localStorage
  const [paymentMethod, setPaymentMethod] = useState(''); // Stores the selected payment method
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  // Calculate subtotal and total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryfee;
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  // Handle change in payment method
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle input changes in shipping form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  // Fetch user data on mount
  useEffect(() => {
    if (userEmail) {
      API.get(`/profile/${userEmail}`)
        .then(response => {
          setUser(response.data);
          console.log("User data from Checkout Page",response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userEmail]);

  console.log("Cart Data before making order data",cart);
  console.log("Cart Data before makingdata",cart[0]._id);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const orderData = {
      user: user.user._id,
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image[0],
      })),
      shippingDetails,
      paymentMethod,
      totalAmount: total,
    };
  
    try {
      if (paymentMethod === 'cash') {
        const response = await API.post('/orders/placeorder', orderData);
        if (response.status === 200) {
          setShowSuccessNotification(true);
          setTimeout(() => {
            setShowSuccessNotification(false);
            navigate('/thankyou');
          }, 2000);
        }
      } else if (paymentMethod === 'paypal') {
        const stripeRes = await API.post('/stripe/create-checkout-session', {
          items: orderData.items,
          userId: orderData.user,
          shippingDetails: orderData.shippingDetails,
          totalAmount: orderData.totalAmount
        });
        window.location.href = stripeRes.data.url;
      } else {
        alert("Please select a valid payment method.");
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>Your order has been placed successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information Form */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 mt-1 border rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 mt-4 bg-black text-white rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Method and Order Summary */}
        <div className="lg:col-span-1 space-y-8">
          {/* Payment Method Section */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-4 sm:grid-cols-3 gap-4">
              {/* Cash Option */}
              <div
                onClick={() => handlePaymentMethodChange('cash')}
                className={`cursor-pointer p-4 border rounded-lg text-center transition-transform transform hover:scale-95 ${paymentMethod === 'cash' ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <FaMoneyBillWave className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm font-semibold">Cash</p>
                {paymentMethod === 'cash' && <span className="text-blue-500 text-xs">Selected</span>}
              </div>

              {/* PayPal Option */}
              <div
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`cursor-pointer p-4 border rounded-lg text-center transition-transform transform hover:scale-95 ${paymentMethod === 'paypal' ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <FaPaypal className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm font-semibold">PayPal</p>
                {paymentMethod === 'paypal' && <span className="text-blue-500 text-xs">Selected</span>}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{currency}{deliveryfee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
