import { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
    subCategory: '',
    sizes: ['S', 'M', 'L', 'XL'], 
    selectedSizes: [], 
    bestseller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setProductData((prevData) => {
      if (type === 'checkbox') {
        if (name === 'sizes') {
          const updatedSizes = checked
            ? [...prevData.selectedSizes, value]
            : prevData.selectedSizes.filter((size) => size !== value);

          return { ...prevData, selectedSizes: updatedSizes };
        } else {
          return { ...prevData, [name]: checked };
        }
      }

      if (type === 'file') {
        return { ...prevData, [name]: files[0] };
      }

      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.description || !productData.price) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create a new FormData instance
    const formData = new FormData();

    // Append product details to formData
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subCategory', productData.subCategory);
    formData.append('bestseller', productData.bestseller);
    formData.append('sizes', JSON.stringify(productData.selectedSizes));  // sizes as a stringified array
    if (productData.image) {
      formData.append('image', productData.image);  // Append the image file
    }

    try {
      // Send formData as multipart/form-data
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important to use multipart/form-data for file upload
        },
      });
      alert('Product added successfully!');

      setProductData({
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
        subCategory: '',
        sizes: ['S', 'M', 'L', 'XL'], 
        selectedSizes: [],
        bestseller: false,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Product Name & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Price & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {productData.category && (
            <div>
              <label htmlFor="subCategory" className="block text-gray-700 font-medium mb-2">Subcategory</label>
              <select
                id="subCategory"
                name="subCategory"
                value={productData.subCategory}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a Subcategory</option>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          )}
        </div>

        {/* Sizes */}
        {productData.sizes && productData.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Size:</h3>
            <div className="grid grid-cols-4 gap-2">
              {productData.sizes.map((size, index) => (
                <label
                  key={index}
                  className={`flex items-center justify-center p-3 border rounded cursor-pointer transition-colors
                    ${productData.selectedSizes.includes(size) 
                      ? 'border-gray-800 bg-gray-50 text-gray-700' 
                      : 'border-gray-200 hover:border-blue-200'}`}
                >
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={productData.selectedSizes.includes(size)}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Bestseller */}
        <div className="mb-4">
          <label htmlFor="bestseller" className="flex items-center text-gray-700 font-medium">
            <input
              type="checkbox"
              id="bestseller"
              name="bestseller"
              checked={productData.bestseller}
              onChange={handleChange}
              className="mr-2"
            />
            Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-bold rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
