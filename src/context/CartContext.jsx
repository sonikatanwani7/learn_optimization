import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
const CART_KEY = "cartItems";
function readCart() {
  try {
    const saved = localStorage.getItem(CART_KEY); 
    if (!saved) return [];
    const parsed = JSON.parse(saved);            
    return Array.isArray(parsed) ? parsed : [];   
  } catch {
    return [];
  }
}

const [cartItems, setCartItems] = useState(readCart);  


  function addItem(id) {
    const foundItem = cartItems?.find((item) => item.id == id);
    if (!foundItem) {
      setCartItems([...cartItems, { id: id, quantity: 1 }]);
    } else {
      const updatedCartItem = cartItems?.map((item) =>
        item.id == id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedCartItem);
    }
  }

  function removeItem(id) {
    setCartItems(cartItems?.filter((item) => item.id != id));
  }
  function changeQuantity(id, newQuantity) {
    setCartItems(
      cartItems.map((item) =>
        item.id == id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
