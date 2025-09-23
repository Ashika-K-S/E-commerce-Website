import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Heart, Star } from "lucide-react";
import { useStore } from "../Context/StoreContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
    axios.get(`http://localhost:5000/reviews?productId=${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-24">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            {product.discount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-md shadow group-hover:scale-105 transition-transform"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full ${
                wishlist.find((item) => item.id === product.id)
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Heart
                size={24}
                fill={
                  wishlist.find((item) => item.id === product.id)
                    ? "red"
                    : "none"
                }
              />
            </button>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color={star <= Math.round(avgRating) ? "#FFD700" : "#ccc"}
                  />
                ))}
                <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mb-2">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-green-600 font-semibold mb-4">
                Free shipping on orders over ₹50,000
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold">Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => addToCart({ ...product, quantity })}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate("/Checkout", { state: { items: [{ ...product, quantity }] } })}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  Buy Now
                </button>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {reviews.map((review) => (
                      <li key={review.id} className="border p-3 rounded">
                        <p className="font-semibold">
                          {review.name} ({review.rating}⭐)
                        </p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
