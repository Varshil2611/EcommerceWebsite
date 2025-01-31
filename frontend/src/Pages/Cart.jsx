import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const { cart, currency, deliveryfee, removeFromCart, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryfee;

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, size, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate('/collection')}
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaArrowRight />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="border rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-white shadow-sm"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Price: {currency}{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                        className="px-3 py-1 border-r hover:bg-gray-100"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                        className="px-3 py-1 border-l hover:bg-gray-100"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
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

              <div className="flex justify-center">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <FaArrowRight />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
