import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/users/${user.id}`);
          setCart(res.data.cart || []);
          setWishlist(res.data.wishlist || []);
        } catch (err) {
          console.log("Error fetching user data:", err);
        }
      } else {
       
        setCart([]);
        setWishlist([]);
      }
    };
    fetchUserData();
  }, [user]);

  
  const addToCart = async (product) => {
    if (!user) {
      alert("Login First");
      return;
    }

    try {
      const exists = cart.find((p) => p.id === product.id);
      let updatedCart;

      if (exists) {
        updatedCart = cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        cart: updatedCart,
        wishlist, 
      });

      
      setCart(updatedCart);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return;

    const updatedCart = cart.filter((item) => item.id !== id);

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        cart: updatedCart,
        wishlist,
      });
      setCart(updatedCart);
    } catch (err) {
      console.log("Error removing from cart:", err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!user) return;
    if (quantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        cart: updatedCart,
        wishlist,
      });
      setCart(updatedCart);
    } catch (err) {
      console.log("Error updating quantity:", err);
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      alert("Login First");
      return;
    }

    let updatedWishlist;
    const exists = wishlist.find((p) => p.id === product.id);

    if (exists) {
      updatedWishlist = wishlist.filter((p) => p.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        cart, 
        wishlist: updatedWishlist,
      });
      setWishlist(updatedWishlist);
      alert(exists ? "Removed from Wishlist" : "Added to Wishlist");
    } catch (err) {
      console.log("Error updating wishlist:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((item) => item.id !== id);

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        cart,
        wishlist: updatedWishlist,
      });
      setWishlist(updatedWishlist);
    } catch (err) {
      console.log("Error removing from wishlist:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        setCart,
        setWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
