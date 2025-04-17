// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditProductForm = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate(); 

//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: null,
//     category: '',
//     subCategory: '',
//     sizes: ['S', 'M', 'L', 'XL'],
//     selectedSizes: [],
//     bestseller: false,
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         console.log(response);  
//         const product = response.data;

//         setProductData({
//           name: product.name,
//           description: product.description,
//           price: product.price,
//           image: product.image,
//           category: product.category,
//           subCategory: product.subCategory,
//           sizes: ['S', 'M', 'L', 'XL'],
//           selectedSizes: product.sizes,
//           bestseller: product.bestseller,
//         });
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };
//     fetchProduct
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     setProductData((prevData) => {
//       if (type === 'checkbox') {
//         if (name === 'sizes') {
//           const updatedSizes = checked
//             ? [...prevData.selectedSizes, value]
//             : prevData.selectedSizes.filter((size) => size !== value);

//           return { ...prevData, selectedSizes: updatedSizes };
//         } else {
//           return { ...prevData, [name]: checked };
//         }
//       }

//       if (type === 'file') {
//         return { ...prevData, [name]: files[0] };
//       }

//       return { ...prevData, [name]: value };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!productData.name || !productData.description || !productData.price) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', productData.name);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('category', productData.category);
//     formData.append('subCategory', productData.subCategory);
//     formData.append('bestseller', productData.bestseller);
//     formData.append('sizes', JSON.stringify(productData.selectedSizes));

//     if (productData.image && typeof productData.image !== 'string') {
//       formData.append('image', productData.image);
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Product updated successfully!');
//       navigate(`/product/${id}`);
//     } catch (error) {
//       console.error('Error updating product:', error);
//       alert('Error updating product.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Product Image</label>
//             {productData.image && <img src={productData.image} alt="Product" className="mb-2" />}
//             <input
//               type="file"
//               id="image"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
//             <select
//               id="category"
//               name="category"
//               value={productData.category}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select a Category</option>
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>
//           {productData.category && (
//             <div>
//               <label htmlFor="subCategory" className="block text-gray-700 font-medium mb-2">Subcategory</label>
//               <select
//                 id="subCategory"
//                 name="subCategory"
//                 value={productData.subCategory}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="">Select a Subcategory</option>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </select>
//             </div>
//           )}
//         </div>
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Size:</h3>
//           <div className="grid grid-cols-4 gap-2">
//             {productData.sizes.map((size, index) => (
//               <label key={index} className={`flex items-center justify-center p-3 border rounded cursor-pointer transition-colors 
//                 ${productData.selectedSizes.includes(size) ? 'border-gray-800 bg-gray-50 text-gray-700' : 'border-gray-200 hover:border-blue-200'}`}>
//                 <input
//                   type="checkbox"
//                   name="sizes"
//                   value={size}
//                   checked={productData.selectedSizes.includes(size)}
//                   onChange={handleChange}
//                   className="hidden"
//                 />
//                 {size}
//               </label>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="bestseller" className="flex items-center text-gray-700 font-medium">
//             <input
//               type="checkbox"
//               id="bestseller"
//               name="bestseller"
//               checked={productData.bestseller}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Bestseller
//           </label>
//         </div>
//         <div className="mt-6">
//           <button type="submit" className="w-full py-2 bg-gray-800 text-white font-bold rounded">
//             Update Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProductForm;


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
          image: null, // Will handle image separately
        });

        // Show existing image
        if (data.image) {
          setPreviewImage(`http://localhost:5000/uploads/${data.image}`);
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
    setPreviewImage(URL.createObjectURL(file));
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
          className="w-full py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition-colors"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
