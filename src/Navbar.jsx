import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-yellow-400 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Website Name */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          LOREEZ
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-300 transition">
            Products
          </Link>
          <Link to="/register" className="hover:text-yellow-300 transition">
            Register
          </Link>
          <Link to="/login" className="hover:text-yellow-300 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
