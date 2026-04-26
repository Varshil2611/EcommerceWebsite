import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data = response.data;

        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          sizes: data.sizes || [],
          bestseller: data.bestseller || false,
          image: null,
        });

        // ✅ FIX: Cloudinary image (already full URL)
        if (data.image) {
          setPreviewImage(data.image);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));

    // ✅ preview new image
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      bestseller: e.target.checked,
    }));
  };

  const handleSizesChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      sizes: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("sizes", JSON.stringify(product.sizes));
      formData.append("bestseller", product.bestseller);

      // ✅ Only send image if new file selected
      if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate("/admin/products");

    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Name & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows="4"
              value={product.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </div>

        {/* Price & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Image</label>

            {/* ✅ Preview (Cloudinary or new file) */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 object-cover mb-2 rounded"
              />
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={product.category}
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

          {product.category && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subcategory</label>
              <select
                name="subCategory"
                value={product.subCategory}
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Sizes (comma separated)</label>
          <input
            type="text"
            name="sizes"
            value={product.sizes.join(", ")}
            onChange={handleSizesChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Bestseller */}
        <div className="mb-4">
          <label className="flex items-center text-gray-700 font-medium">
            <input
              type="checkbox"
              name="bestseller"
              checked={product.bestseller}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-gray-800 text-white font-bold rounded"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </form>
    </div>
  );
};

export default EditProductForm;