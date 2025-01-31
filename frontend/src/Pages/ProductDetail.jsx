// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const { products, addToCart } = useContext(ShopContext);
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     if (products) {
//       const foundProduct = products.find(p => p._id === productId);
//       setProduct(foundProduct);
//       setLoading(false);
//     }
//   }, [productId, products]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
//         <button 
//           onClick={() => navigate('/products')}
//           className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//         >
//           Return to Products
//         </button>
//       </div>
//     );
//   }

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//   const handleQuantityChange = (newQuantity) => {
//     const qty = Math.max(1, Math.min(99, Number(newQuantity)));
//     setQuantity(qty);
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert("Please select a size");
//       return;
//     }

//     addToCart(product, selectedSize, quantity);
    
    
//     const notification = document.createElement('div');
//     notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
//     notification.textContent = `${product.name} has been added to your cart`;
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//       notification.remove();    
//     }, 2000);
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
        
//         {/* Image Section */}
//         <div className="relative z-10">
//           <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
//             <img
//               className="w-full h-full object-cover"
//               src={product.image[0]}
//               alt={product.name}
//             />
//           </div>
//           {product.image.length > 1 && (
//             <div className="mt-4 flex gap-2 overflow-x-auto">
//               {product.image.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`${product.name} view ${index + 1}`}
//                   className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

        
//         <div className="flex flex-col relative z-20 mt-4 md:mt-0">
//           <nav className="text-sm mb-4">
//             <button onClick={() => navigate('/collection')} className="text-blue-500 hover:underline">
//               ← Back to Products
//             </button>  
//           </nav>
          
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{product.name}</h2>
//           <p className="text-lg text-gray-600 mb-6">{product.description}</p>
//           <p className="text-2xl font-semibold text-gray-900 mb-6">{product.price.toLocaleString('en-US', {
//             style: 'currency',
//             currency: 'USD'
//           })}</p>

//           {/* Size Selection Section */}
//           {product.sizes && product.sizes.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Size:</h3>
//               <div className="grid grid-cols-4 gap-2">
//                 {product.sizes.map((size, index) => (
//                   <label
//                     key={index}
//                     className={`flex items-center justify-center p-3 border rounded cursor-pointer transition-colors
//                       ${selectedSize === size 
//                         ? 'border-blue-500 bg-blue-50 text-blue-700' 
//                         : 'border-gray-200 hover:border-blue-200'}`}
//                   >
//                     <input
//                       type="radio"
//                       name="size"
//                       value={size}
//                       checked={selectedSize === size}
//                       onChange={handleSizeChange}
//                       className="hidden"
//                     />
//                     {size}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quantity Section */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Quantity:</h3>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-50"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => handleQuantityChange(e.target.value)}
//                 min="1"
//                 max="99"
//                 className="w-20 text-center border p-2 rounded"
//               />
//               <button
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-50"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out
//               ${selectedSize
//                 ? "bg-black"
//                 : 'bg-gray-400 cursor-not-allowed'}`}
//             onClick={handleAddToCart}
//             disabled={!selectedSize}
//           >
//             {selectedSize ? 'Add to Cart' : 'Please Select a Size'}
//           </button>

//           {/* Product Details Section */}
//           <div className="mt-12 border-t pt-8">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Details</h3>
//             <dl className="grid grid-cols-1 gap-4">
//               <div>
//                 <dt className="font-medium text-gray-700">Category</dt>
//                 <dd className="mt-1 text-gray-600">{product.category || 'Not specified'}</dd>
//               </div>            
//             </dl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track any errors during the API request
  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${productId}`); // Update with correct API endpoint
        const data = await response.json();
        
        if (response.ok) {
          setProduct(data); // Set the product if the request was successful
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false); // Always stop loading after the fetch attempt
      }
    };

    fetchProduct();
  }, [productId]); // Dependency on productId to refetch if it changes

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Error handling state
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">{error}</h2>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Return to Products
        </button>
      </div>
    );
  }

  // If no product found
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(99, Number(newQuantity)));
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize, quantity);
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = `${product.name} has been added to your cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();    
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
        
        {/* Image Section */}
        <div className="relative z-10">
          <div className="w-full max-w-md mx-auto aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-contain" // Keeps the aspect ratio and fits image inside container
              src={product.image} // Only one image now
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col relative z-20 mt-4 md:mt-0">
          <nav className="text-sm mb-4">
            <button onClick={() => navigate('/collection')} className="text-blue-500 hover:underline">
              ← Back to Products
            </button>
          </nav>
          
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-6">{product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}</p>

          {/* Size Selection Section */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Size:</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-center p-3 border rounded cursor-pointer transition-colors
                      ${selectedSize === size 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={handleSizeChange}
                      className="hidden"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Quantity:</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min="1"
                max="99"
                className="w-20 text-center border p-2 rounded"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out
              ${selectedSize
                ? "bg-black"
                : 'bg-gray-400 cursor-not-allowed'}`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            {selectedSize ? 'Add to Cart' : 'Please Select a Size'}
          </button>

          {/* Product Details Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Details</h3>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="font-medium text-gray-700">Category</dt>
                <dd className="mt-1 text-gray-600">{product.category || 'Not specified'}</dd>
              </div>            
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
