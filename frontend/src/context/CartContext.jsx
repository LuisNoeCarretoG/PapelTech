import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...current, { ...product, cantidad: 1 }];
    });
  };

  const updateQuantity = (id, cantidad) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, cantidad: Number(cantidad) } : item));
  };

  const removeFromCart = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((acc, item) => acc + Number(item.precio) * Number(item.cantidad), 0), [items]);

  return <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, total }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
