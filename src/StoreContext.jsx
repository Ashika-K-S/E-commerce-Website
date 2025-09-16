import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to cart safely with numeric price & quantity
  const addToCart = (product) => {
    const exist = cart.find((p) => p.id === product.id);
    if (exist) return; // prevent duplicates
    setCart([
      ...cart,
      {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity) || 1,
      },
    ]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, Number(quantity)) } : p
      )
    );
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    if (wishlist.find((p) => p.id === product.id)) return;
    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((p) => p.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
