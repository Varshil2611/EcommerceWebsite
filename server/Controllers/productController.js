import Product from '../Models/productModel.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add base URL to the image path
    if (product.image) {
      product.image = `${req.protocol}://${req.get('host')}/uploads/${product.image}`;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subCategory,
      image,
      sizes: JSON.parse(sizes), // Parse the stringified array
      bestseller,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
  const image = req.file ? req.file.filename : undefined;

  const updatedProductData = {
    name,
    description,
    price,
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestseller,
  };

  if (image) {
    updatedProductData.image = image;
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get total number of products
export const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total products", error: error.message });
  }
};

