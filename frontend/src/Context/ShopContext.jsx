import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext({
  products: [],
  cart: [],
  currency: '$',
  deliveryfee: 10,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Change the URL to your backend API
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means it runs only once when component mounts

  // Function to add product to the cart
  const addToCart = (product, selectedSize, quantity) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item._id === product._id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += parseInt(quantity);
        return updatedCart;
      } else {
        // Add new item if it doesn't exist
        return [...prevCart, {
          ...product,
          size: selectedSize,
          quantity: parseInt(quantity),
        }];
      }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (productId, size) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item._id === productId && item.size === size))
    );
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, size, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.size === size
          ? { ...item, quantity: parseInt(newQuantity) }
          : item
      )
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);  // Clear the cart state
    localStorage.removeItem('cart');  // Remove cart from localStorage (if used)
  };

  // Providing context value
  const value = {
    products,
    cart,
    currency: '$',
    deliveryfee: 10,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,  // Exposing clearCart function to context
    loading, // Pass loading state to the context
    error,   // Pass error state to the context
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
