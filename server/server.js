import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); 
// Controllers
import * as productController from './Controllers/productController.js';
import * as authController from './Controllers/authController.js';
import * as orderController from './Controllers/orderController.js';

// Initialize Express app
const app = express();


// Serve images from the 'uploads' folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cors());

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.static('uploads'));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Ecommerce_DB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

//Orders Routes
app.post('/orders/placeorder',orderController.createOrder);
app.get('/orders/:userId',orderController.getUserOrders);
app.get('/api/orders',orderController.getAllOrders);
app.patch('/api/orders/:orderId/status',orderController.StatusChange);


//User Routes
app.post('/register',authController.registerUser);
app.post('/', authController.loginUser); 
app.get('/profile/:email',authController.getCurrentUser);
app.get('/userprofile/profile/:email',orderController.getUserProfile);


// Product Routes
app.get('/api/products', productController.getAllProducts); 
app.get('/api/products/:id', productController.getProductById); 
app.post('/api/products', upload.single('image'), productController.createProduct); 
app.put('/api/products/:id', upload.single('image'), productController.updateProduct); 
app.delete('/api/products/:id', productController.deleteProduct); 
app.get('/api/products/total', productController.getTotalProducts);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
