import Order from '../Models/orderModel.js';
import User from '../Models/userModel.js';  

export const createOrder = async (req, res) => {
  try {
    const { user, items, shippingDetails, paymentMethod, totalAmount } = req.body;
    
    if (!user || !items || !shippingDetails || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const newOrder = new Order({
      user,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image, 
      })),
      shippingDetails,
      paymentMethod,
      totalAmount,
    });
  
    const savedOrder = await newOrder.save();
   
    res.status(200).json({
      message: 'Order placed successfully!',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);  
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;  
   
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({
      message: 'Orders fetched successfully!',
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try { 
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ orders });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

export const StatusChange =  async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;  

  try {
  
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

   
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUserProfile = async (req, res) => {
  const userEmail = req.params.email;  
  try {
    
    const user = await User.findOne({ email: userEmail });    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    
    const orders = await Order.find({ user: user._id });  
    const totalOrders = orders.length;
    const totalSpend = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    res.json({
      username: user.username, 
      totalOrders,
      totalSpend,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};