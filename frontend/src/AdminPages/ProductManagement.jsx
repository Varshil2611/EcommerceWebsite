import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Store product data
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Product to delete

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products'); // Change to your API endpoint
        setProducts(response.data); // Set fetched data into the state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Delete product handler (you can modify this according to your API logic)
  const handleDelete = async (productId) => {
    try {
      await API.delete(`/products/${productId}`); // Change to your delete API endpoint
      setProducts(products.filter((product) => product._id !== productId)); // Remove deleted product from the state
      setDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Open modal and set the product to be deleted
  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  // Close the modal without deleting
  const closeDeleteModal = () => {
    setProductToDelete(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      <Link to="/admin/products/add" className="bg-gray-800 text-white px-4 py-2 rounded-md mb-6 inline-block">
        Add New Product
      </Link>

      {/* Loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-6 py-3">
                  {/* Display image */}
                  <img src={product.image} alt={product.name} className="w-30 h-20 object-cover" />
                </td>
                <td className="px-6 py-3">{product.name}</td>
                <td className="px-6 py-3">${product.price}</td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3">
                  <Link to={`/admin/products/edit/${product._id}`} className="text-blue-500 hover:underline">Edit</Link> | 
                  <span 
                    className="text-red-500 cursor-pointer hover:underline" 
                    onClick={() => openDeleteModal(product._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Are you sure you want to delete this product?</h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(productToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
