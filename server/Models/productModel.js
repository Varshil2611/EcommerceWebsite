import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  image: { 
    type: String, 
    required: true,  // Ensure that the image is required
  },
  sizes: { type: [String], default: [] },
  bestseller: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
