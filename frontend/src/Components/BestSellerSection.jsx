import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const BestSellerSection = () => {
  const { products } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  const bestsellerProducts = products.filter((product) => product.bestseller);

  if (bestsellerProducts.length === 0) {
    return <div>No bestsellers available at the moment.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1
        className="text-3xl font-extrabold text-center mb-6 underline"
        data-aos="fade-right"
        data-aos-duration="500"
      >
        Bestsellers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestsellerProducts.map((product, index) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            data-aos-duration="800"
          >
            <Link to={`/product/${product._id}`}>
              <img
                className="w-full h-64 object-cover rounded-lg mb-4"
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src = "https://via.placeholder.com/300";
                }}
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

export default BestSellerSection;