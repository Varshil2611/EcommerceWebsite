import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "./Config/cloudinary.js";
import connectDB from "./Config/databaseConnection.js";

dotenv.config();

// Controllers
import * as productController from "./Controllers/productController.js";
import * as authController from "./Controllers/authController.js";
import * as orderController from "./Controllers/orderController.js";
import * as contactController from "./Controllers/contactController.js";

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",          
    "https://ecommerce-website-six-azure.vercel.app",    
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB
connectDB();

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ---------------- ROUTES ---------------- //

//Orders
app.post("/api/orders/placeorder", orderController.createOrder);
app.get("/api/orders/status-overview", orderController.getOrdersStatusSummary); // 👈 moved UP
app.get("/api/orders", orderController.getAllOrders);
app.get("/api/orders/:userId", orderController.getUserOrders);            // 👈 dynamic LAST
app.patch("/api/orders/:orderId/status", orderController.StatusChange);

// Users
app.post("/api/register", authController.registerUser);
app.post("/api/", authController.loginUser);
app.get("/api/profile/:email", authController.getCurrentUser);
app.get("/api/userprofile/profile/:email", orderController.getUserProfile);

// Products
app.get("/api/products", productController.getAllProducts);
app.get("/api/products/total", productController.getTotalProducts);
app.get("/api/products/:id", productController.getProductById);

app.post(
  "/api/products",
  upload.single("image"),
  productController.createProduct,
);

app.put(
  "/api/products/:id",
  upload.single("image"),
  productController.updateProduct,
);

app.delete("/api/products/:id", productController.deleteProduct);

// Contact
app.post("/api/contact", contactController.ContactUs);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
