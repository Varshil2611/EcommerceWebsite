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











import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to store product data
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product data');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle the form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      if (product.imageUrl) {
        formData.append('image', product.imageUrl);
      }

      const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      navigate(`/admin/products`); 
    } catch (error) {
      setError('Error updating product');
    }
  };

  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <img src={product.image} alt={product.name} className="w-30 h-20  object-cover" />
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block">Product Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={(e) => setProduct({ ...product, imageUrl: e.target.files[0] })}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
