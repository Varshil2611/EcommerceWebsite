import { createContext, useState, useEffect } from "react";
import API from "../api/axios.js";
export const ShopContext = createContext({
  products: [],
  cart: [],
  currency: "$",
  deliveryfee: 10,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        const data = await response.data;
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id && item.size === selectedSize,
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += parseInt(quantity);
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { ...product, size: selectedSize, quantity: parseInt(quantity) },
        ];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item._id === productId && item.size === size),
      ),
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: parseInt(newQuantity) }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const value = {
    products,
    cart,
    currency: "$",
    deliveryfee: 10,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
    error,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
