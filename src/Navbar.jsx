import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useStore } from "./StoreContext";

export default function Navbar({ featuredProduct }) {
  const { wishlist, cart } = useStore();
  const navigate = useNavigate();

  // Buy Now handler
  const handleBuyNow = () => {
    if (!featuredProduct) return alert("No featured product available!");
    navigate("/checkout", { state: { items: [{ ...featuredProduct, quantity: 1 }] } });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-yellow-500">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left side - Logo and links */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-yellow-600">LOREEZ</h1>
          <Link to="/" className="text-yellow-600 hover:text-yellow-800 flex items-center">
            <HomeIcon className="h-5 w-5 mr-1" /> Home
          </Link>
          <Link to="/products" className="text-yellow-600 hover:text-yellow-800">
            Products
          </Link>
        </div>

        {/* Right side - Icons and Buy Now */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="text-yellow-600 hover:text-yellow-800 relative">
            <HeartIcon className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="text-yellow-600 hover:text-yellow-800 relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/register" className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1">
            <UserIcon className="h-6 w-6" />
            <span>Login / Register</span>
          </Link>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </nav>
  );
}
