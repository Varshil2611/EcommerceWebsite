import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, unique: true, required: true }, // Sequential Order ID
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      price: Number,
      quantity: Number,
      size: String,
      image: String,
    },
  ],
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
  },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
  