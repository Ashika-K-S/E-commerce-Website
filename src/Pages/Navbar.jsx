import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useStore } from "../Context/StoreContext";
import { useAuth } from "../Context/AuthContext"; 

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const navigateClick = () => navigate("/");

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-yellow-500">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1
            onClick={navigateClick}
            className="text-2xl font-bold text-yellow-600 cursor-pointer"
          >
            LOREEZ
          </h1>
          <Link
            to="/"
            className="text-yellow-600 hover:text-yellow-800 flex items-center"
          >
            <HomeIcon className="h-5 w-5 mr-1" /> Home
          </Link>
          <Link
            to="/products"
            className="text-yellow-600 hover:text-yellow-800"
          >
            Products
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/wishlist"
            className="text-yellow-600 hover:text-yellow-800 relative"
          >
            <HeartIcon className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="text-yellow-600 hover:text-yellow-800 relative"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <button
  onClick={handleLogout}
  className="relative bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] text-white px-4 py-2 rounded-xl shadow-lg font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
>
  Logout
</button>

          ) : (
            <Link
              to="/login"
              className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1"
            >
              <UserIcon className="h-6 w-6" />
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
