import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios.js";

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      const data = response.data;

      if (!Array.isArray(data)) {
        throw new Error("Invalid product data");
      }

      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const handleFilterChange = (filterType, value) => {
    const updatedFilter =
      filterType === "category"
        ? [...categoryFilter]
        : filterType === "subCategory"
        ? [...subCategoryFilter]
        : [...priceFilter];

    if (updatedFilter.includes(value)) {
      const index = updatedFilter.indexOf(value);
      updatedFilter.splice(index, 1);
    } else {
      updatedFilter.push(value);
    }

    if (filterType === "category") {
      setCategoryFilter(updatedFilter);
    } else if (filterType === "subCategory") {
      setSubCategoryFilter(updatedFilter);
    } else {
      setPriceFilter(updatedFilter);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (!product) return false; // ✅ safety

    const isCategoryMatch =
      categoryFilter.length === 0 ||
      categoryFilter.includes(product.category);

    const isSubCategoryMatch =
      subCategoryFilter.length === 0 ||
      subCategoryFilter.includes(product.subCategory);

    const isPriceMatch =
      priceFilter.length === 0 ||
      priceFilter.some((filter) => {
        if (filter === "Under $150" && product.price < 150) return true;
        if (filter === "Under $200" && product.price < 200) return true;
        if (filter === "Above $200" && product.price >= 200) return true;
        return false;
      });

    return isCategoryMatch && isSubCategoryMatch && isPriceMatch;
  });

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        All Collection
      </h1>

      {/* Filters */}
      <div className="mb-6 flex justify-center space-x-6">
        {/* Category */}
        <div>
          <p className="font-semibold mb-2">Category</p>
          {["Men", "Women", "Kids"].map((category) => (
            <label key={category} className="block">
              <input
                type="checkbox"
                checked={categoryFilter.includes(category)}
                onChange={() =>
                  handleFilterChange("category", category)
                }
              />{" "}
              {category}
            </label>
          ))}
        </div>

        {/* SubCategory */}
        <div>
          <p className="font-semibold mb-2">SubCategory</p>
          {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
            <label key={sub} className="block">
              <input
                type="checkbox"
                checked={subCategoryFilter.includes(sub)}
                onChange={() =>
                  handleFilterChange("subCategory", sub)
                }
              />{" "}
              {sub}
            </label>
          ))}
        </div>

        {/* Price */}
        <div>
          <p className="font-semibold mb-2">Price</p>
          {["Under $150", "Under $200", "Above $200"].map((price) => (
            <label key={price} className="block">
              <input
                type="checkbox"
                checked={priceFilter.includes(price)}
                onChange={() =>
                  handleFilterChange("price", price)
                }
              />{" "}
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Products */}
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
                  src={
                    product.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name || "Product"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300";
                  }}
                />
              </Link>

              <h2 className="text-xl font-bold mb-2">
                {product.name || "No Name"}
              </h2>

              <p className="text-gray-600 text-sm mb-2">
                {product.description || "No description"}
              </p>

              <p className="text-lg font-semibold">
                Price: ${product.price || 0}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;