import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';  // Import ShopContext properly
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const LatestCollection = () => {
  const { products } = useContext(ShopContext);  // Destructure 'products' from context

  if (!products || products.length === 0) {
    return <div>Loading...</div>;  // Fallback if products is undefined or empty
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold text-center mb-6 underline">Latest Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 10).map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            {/* Link wrapping the image to navigate to product details */}
            <Link to={`/product/${product._id}`}>
              <img
                className="w-full h-64 object-cover rounded-lg mb-4"
                src={`http://localhost:5000/uploads/${product.image}`} 
                alt={product.name}
              />
            </Link>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-lg font-semibold">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
