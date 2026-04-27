import express from "express";
import Stripe from "stripe";
import Order from "../Models/orderModel.js";
import User from "../Models/userModel.js";
import Counter from "../Models/counterModel.js";
import { sendEmail } from "../Config/emailService.js";

export const createOrder = async (req, res) => {
  try {
    const { user, items, shippingDetails, paymentMethod, totalAmount } =
      req.body;

    if (!user || !items || !shippingDetails || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if Counter is retrieved correctly
    const counter = await Counter.findOneAndUpdate(
      { name: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    if (!counter) {
      return res
        .status(500)
        .json({ message: "Counter not found or failed to update" });
    }

    console.log("Counter after update:", counter); // Debugging log

    const newOrder = new Order({
      orderId: counter.seq,
      user,
      items: items.map((item) => ({
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

    // Get user
    const userData = await User.findById(user);

    // Build items HTML
    const itemsHtml = items
      .map(
        (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price}</td>
    </tr>
  `,
      )
      .join("");

    const userName = userData.username || userData.name || "Customer";
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmation</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f4; font-family:'Segoe UI', Arial, sans-serif;">

  <div style="max-width:500px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#000; padding:26px 32px; text-align:center;">
      <h1 style="margin:0; color:#fff; font-size:22px; letter-spacing:4px;">CLOTHIFY</h1>
    </div>

    <!-- Body -->
    <div style="padding:36px 32px; text-align:center;">
      <p style="font-size:36px; margin:0;">🎉</p>
      <h2 style="margin:14px 0 8px; font-size:22px; color:#111;">Order Confirmed!</h2>
      <p style="margin:0; font-size:14px; color:#555; line-height:1.7;">
        Hey <strong style="color:#111;">${userName}</strong>, your order has been successfully placed.<br/>
        We're getting it ready and will ship it soon.
      </p>

      <!-- Divider -->
      <hr style="border:none; border-top:1px solid #eee; margin:28px 0;" />

      <!-- Order Details -->
      <div style="text-align:left; background:#f9f9f9; border-radius:10px; padding:18px 22px;">
        <p style="margin:0 0 10px; font-size:12px; font-weight:700; color:#111; text-transform:uppercase; letter-spacing:1px;">
          Order Details
        </p>
        <p style="margin:0 0 6px; font-size:13px; color:#555;">
          📅 Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p style="margin:0 0 6px; font-size:13px; color:#555;">
          💰 <strong style="ml-1">Total:</strong> ₹${totalAmount}
        </p>
        <p style="margin:0; font-size:13px; color:#555;">
          🚚 Delivery: 5–7 Business Days
        </p>
      </div>

      <p style="margin:24px 0 0; font-size:13px; color:#888;">
        Thank you for shopping with us! 🛍️
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:18px 32px; border-top:1px solid #eee; text-align:center;">
      <p style="margin:0; font-size:11px; color:#aaa;">
        © ${new Date().getFullYear()} Clothify · Surat, Gujarat, India
      </p>
    </div>

  </div>

</body>
</html>
`;
    // Send email
    await sendEmail({
      to: userData.email,
      subject: `Order Confirmation!`,
      html: emailHtml,
    });

    res.status(200).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments(); // Count total orders

    // Calculate total revenue by summing up all totalAmount values
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }, // Summing all totalAmount
        },
      },
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const StatusChange = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const orders = await Order.find({ user: user._id });
    const totalOrders = orders.length;
    const totalSpend = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );
    res.json({
      username: user.username,
      totalOrders,
      totalSpend,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrdersStatusSummary = async (req, res) => {
  try {
    const statusSummary = await Order.aggregate([
      {
        $match: { status: { $exists: true, $ne: null } }, // Ensure status exists and is not null
      },
      {
        $group: {
          _id: "$status", // Group by status field in orders collection
          count: { $sum: 1 }, // Count orders per status
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ statusSummary });
    console.log(statusSummary);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order status summary",
      error: error.message,
    });
  }
};

const router = express.Router();
export default router;
