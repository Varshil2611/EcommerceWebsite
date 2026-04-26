import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const TestProduct = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products'); // Change to your API endpoint
        setProducts(response.data);
        console.log(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setError("Error",error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterType, value) => {
    const updatedFilter = filterType === 'category' ? [...categoryFilter] :
                          filterType === 'subCategory' ? [...subCategoryFilter] : [...priceFilter];

    if (updatedFilter.includes(value)) {
      const index = updatedFilter.indexOf(value);
      updatedFilter.splice(index, 1);
    } else {
      updatedFilter.push(value);
    }

    if (filterType === 'category') {
      setCategoryFilter(updatedFilter);
    } else if (filterType === 'subCategory') {
      setSubCategoryFilter(updatedFilter);
    } else {
      setPriceFilter(updatedFilter);
    }
  };

  
  const filteredProducts = products.filter((product) => {
    const isCategoryMatch = categoryFilter.length === 0 || categoryFilter.includes(product.category);
    const isSubCategoryMatch = subCategoryFilter.length === 0 || subCategoryFilter.includes(product.subCategory);
    const isPriceMatch = priceFilter.length === 0 || priceFilter.some((filter) => {
      if (filter === "Under $150" && product.price < 150) return true;
      if (filter === "Under $200" && product.price < 200) return true;
      if (filter === "Above $200" && product.price >= 200) return true;
      return false;
    });

    return isCategoryMatch && isSubCategoryMatch && isPriceMatch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">All Collection</h1>

      <div className="mb-6 flex justify-center space-x-6">
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
          {["Men", "Women", "Kids"].map((category) => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={categoryFilter.includes(category)}
                onChange={() => handleFilterChange('category', category)}
                className="mr-2"
              />
              <label htmlFor={`category-${category}`} className="text-gray-600">{category}</label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">SubCategory</label>
          {["Topwear", "Bottomwear", "Winterwear"].map((subCategory) => (
            <div key={subCategory} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`subCategory-${subCategory}`}
                checked={subCategoryFilter.includes(subCategory)}
                onChange={() => handleFilterChange('subCategory', subCategory)}
                className="mr-2"
              />
              <label htmlFor={`subCategory-${subCategory}`} className="text-gray-600">{subCategory}</label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Price Range</label>
          {["Under $150", "Under $200", "Above $200"].map((priceRange) => (
            <div key={priceRange} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`price-${priceRange}`}
                checked={priceFilter.includes(priceRange)}
                onChange={() => handleFilterChange('price', priceRange)}
                className="mr-2"
              />
              <label htmlFor={`price-${priceRange}`} className="text-gray-600">{priceRange}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-lg font-semibold">Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default TestProduct;
