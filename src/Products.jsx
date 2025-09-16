import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useStore } from "./StoreContext";

const ProductsPage = () => {
  const { wishlist, cart, toggleWishlist, addToCart } = useStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", "Necklaces", "Rings", "Earrings", "Bangles"];

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-700">
        Our Products
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 w-72 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-yellow-400 text-white px-4 rounded-r-md"
        >
          Clear
        </button>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold border-2 ${
              category === cat
                ? "bg-yellow-400 text-white border-yellow-500 shadow-lg"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center mt-10">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="relative bg-white p-4 rounded-lg shadow flex flex-col"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  wishlist.find(item => item.id === product.id)
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Heart
                  size={20}
                  fill={
                    wishlist.find(item => item.id === product.id) ? "red" : "none"
                  }
                />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-yellow-600 font-bold mt-1">{product.price}</p>

              {/* Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    alert("Proceed to buy (simulate checkout)");
                  }}
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
