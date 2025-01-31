import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User that placed the order
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Product Id
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    image: String, // Assuming the image is a single string URL
  }],
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,  
  },
  paymentMethod: String,
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
