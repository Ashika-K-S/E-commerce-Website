import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "./StoreContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  // Total price calculation using Number()
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    navigate("/checkout", { state: { items: cart } });
  };

  return (
    <div className="min-h-screen mt-20 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-yellow-600 font-bold">₹{Number(item.price).toLocaleString()}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="font-bold">₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Total: ₹{totalPrice.toLocaleString()}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full md:w-auto mt-2"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
