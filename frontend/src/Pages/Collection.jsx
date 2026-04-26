import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import API from "../api/axios.js";

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  // ─── Fetch Products ───────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("📦 Fetching products from API...");
      try {
        const response = await API.get("/products");
        const data = response.data;
        if (!Array.isArray(data)) throw new Error("Invalid product data");
        console.log(`✅ Products fetched: ${data.length} items`);
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ─── Debounce Search ──────────────────────────────────────
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log(`🔍 Debounced search triggered: "${value}"`);
      setDebouncedQuery(value);
    }, 400),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log(`⌨️ Typing: "${value}" — debounce timer reset`);
    debouncedSearch(value);
  };

  // ─── Filter Handler ───────────────────────────────────────
  const handleFilterChange = (filterType, value) => {
    console.log(`🔧 Filter: ${filterType} → ${value}`);
    const updatedFilter =
      filterType === "category"
        ? [...categoryFilter]
        : filterType === "subCategory"
        ? [...subCategoryFilter]
        : [...priceFilter];

    if (updatedFilter.includes(value)) {
      updatedFilter.splice(updatedFilter.indexOf(value), 1);
      console.log(`Removed: ${value}`);
    } else {
      updatedFilter.push(value);
      console.log(`Added: ${value}`);
    }

    if (filterType === "category") setCategoryFilter(updatedFilter);
    else if (filterType === "subCategory") setSubCategoryFilter(updatedFilter);
    else setPriceFilter(updatedFilter);
  };

  // ─── Filtered Products ────────────────────────────────────
  const filteredProducts = products.filter((product) => {
    if (!product) return false;
    const matchesSearch =
      debouncedQuery === "" ||
      product.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(debouncedQuery.toLowerCase());
    const isCategoryMatch =
      categoryFilter.length === 0 || categoryFilter.includes(product.category);
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
    return matchesSearch && isCategoryMatch && isSubCategoryMatch && isPriceMatch;
  });

  useEffect(() => {
    console.log(`📊 Filtered count: ${filteredProducts.length}`);
  }, [filteredProducts.length]);

  // ─── Clear Filters ────────────────────────────────────────
  const clearAllFilters = () => {
    console.log("Clearing all filters");
    setSearchQuery("");
    setDebouncedQuery("");
    setCategoryFilter([]);
    setSubCategoryFilter([]);
    setPriceFilter([]);
  };

  const hasActiveFilters =
    searchQuery ||
    categoryFilter.length > 0 ||
    subCategoryFilter.length > 0 ||
    priceFilter.length > 0;

  // ─── Loading / Error ──────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-sm">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-1 text-gray-800">
        All Collection
      </h1>
      <p className="text-center text-gray-400 text-sm mb-8">
        {products.length} products available
      </p>

      {/* Main Layout */}
      <div className="flex gap-8">

        {/* ── LEFT SIDEBAR — Filters ── */}
        <div className="w-56 flex-shrink-0">
          <div className="border border-gray-200 rounded-md p-5 sticky top-4">

            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">
                Filters
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-black underline transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">
                Category
              </p>
              {["Men", "Women", "Kids"].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={categoryFilter.includes(category)}
                    onChange={() => handleFilterChange("category", category)}
                    className="accent-black"
                  />
                  {category}
                </label>
              ))}
            </div>

            {/* Type */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">
                Type
              </p>
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={subCategoryFilter.includes(sub)}
                    onChange={() => handleFilterChange("subCategory", sub)}
                    className="accent-black"
                  />
                  {sub}
                </label>
              ))}
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">
                Price
              </p>
              {["Under $150", "Under $200", "Above $200"].map((price) => (
                <label
                  key={price}
                  className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={priceFilter.includes(price)}
                    onChange={() => handleFilterChange("price", price)}
                    className="accent-black"
                  />
                  {price}
                </label>
              ))}
            </div>

          </div>
        </div>

        {/* ── RIGHT CONTENT — Search + Products ── */}
        <div className="flex-1">

          {/* Search Bar */}
          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or description..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedQuery("");
                  console.log("❌ Search cleared");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xl"
              >
                ×
              </button>
            )}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-400 mb-4">
            Showing {filteredProducts.length} of {products.length} products
            {debouncedQuery && (
             <span className="ml-1">
              for<strong className=" ml-1  text-gray-700">{debouncedQuery}</strong>
          </span>
            )}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* ✅ Fixed image container */}
                  <div className="h-72 overflow-hidden bg-gray-50">
                    <img
                      className="w-full h-full object-contain object-center origin-center group-hover:scale-105 transition-transform duration-300"
                      src={product.image || "https://via.placeholder.com/300"}
                      alt={product.name || "Product"}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300";
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                      {product.name || "No Name"}
                    </h2>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {product.description || "No description"}
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      ${product.price || 0}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400 text-sm">No products found</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-3 text-xs text-gray-500 underline hover:text-black"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LatestCollection;