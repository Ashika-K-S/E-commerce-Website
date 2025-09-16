import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useStore } from "./StoreContext";

const WishlistPage = () => {
  const { wishlist, addToCart, toggleWishlist } = useStore();

  if (wishlist.length === 0)
    return <p className="text-center mt-10">Your wishlist is empty</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-8">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-2 right-2 p-2 rounded-full bg-red-100 text-red-500"
            >
              <HeartIcon className="h-5 w-5" />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-yellow-700 font-bold mt-1">{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition"
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
