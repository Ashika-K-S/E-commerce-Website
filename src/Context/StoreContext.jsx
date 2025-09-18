import axios from "axios";
import React, { createContext, useContext, useState,useEffect } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  useEffect(()=>{
    const fetchUserData=async()=>{
      if(user){
      try{
        const result=await axios.get(`http://localhost:5000/users/${user.id}`)
        console.log(result.data.cart);
        setCart(result.data.cart || [])
        setWishlist(result.data.wishlist || [])
      }catch(error){
        console.log("Error fetching data",error)
      }
    }
  };
  fetchUserData()
},[])

  const addToCart = async (product) => {
    if (!user) {
      alert("Login First");
      return;
    }
    try {
      if (user) {
        const userResponse = await axios.get(
          `http://localhost:5000/users/${user.id}`
        );
        const userData = userResponse.data;
        console.log(userData);
        const cart = [
          ...userData.cart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
          },
        ];
        localStorage.setItem("cart",JSON.stringify(cart))

         const userUpdated = { ...userData, cart }
         const cartUpdated= await axios.put(`http://localhost:5000/users/${user.id}`, userUpdated)
         if(cartUpdated){
          alert("Item Added To Cart")
         }

        setCart((prev) => {
          const exists = prev.find((p) => p.id === product.id);
          if (exists) {
            return prev.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
          } else {
            return [...prev, { ...product, quantity: 1 }];
            
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromCart = async (id) => {
  try {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); 

    if (user) {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        cart: updatedCart,
      });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // optional fallback
  } catch (err) {
    console.log("Error removing from cart:", err);
  }
};


  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
 
const addToWishlist = async (product) => {
  if (!user) {
    alert("Login First");
    return;
  }

  try {
    
    const { data: userData } = await axios.get(
      `http://localhost:5000/users/${user.id}`
    );

  
    const currentWishlist = userData.wishlist || [];

    
    const exists = currentWishlist.find((p) => p.id === product.id);

    let updatedWishlist;
    if (exists) {
      
      updatedWishlist = currentWishlist.filter((p) => p.id !== product.id);
    } else {
  
      updatedWishlist = [...currentWishlist, product];
    }

    
    await axios.put(`http://localhost:5000/users/${user.id}`, {
      ...userData,
      wishlist: updatedWishlist,
    });

    
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    alert(exists ? "Removed from Wishlist" : "Added to Wishlist");
  } catch (e) {
    console.log("Error updating wishlist", e);
  }
};


const removeFromWishlist = async (id) => {
  if (!user) {
    alert("Login First");
    return;
  }

  try {
    const { data: userData } = await axios.get(
      `http://localhost:5000/users/${user.id}`
    );

    const updatedWishlist = (userData.wishlist || []).filter(
      (item) => item.id !== id
    );

    
    await axios.put(`http://localhost:5000/users/${user.id}`, {
      ...userData,
      wishlist: updatedWishlist,
    });

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  } catch (e) {
    console.log("Error removing from wishlist", e);
  }
};




  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        user
        
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
