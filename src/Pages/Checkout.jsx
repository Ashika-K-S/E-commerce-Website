import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

 
  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\nTotal: ₹${totalPrice.toLocaleString()}`);
    navigate("/"); 
  };

  if (items.length === 0)
    return <p className="mt-20 p-6 text-center">No items to checkout.</p>;

  return (
    <div className="min-h-screen mt-20 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        Checkout
      </h1>

      
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">
                  {item.quantity || 1} × ₹{item.price}
                </p>
              </div>
            </div>
            <p className="font-bold">
              ₹{(Number(item.price) * Number(item.quantity || 1)).toLocaleString()}
            </p>
          </div>
        ))}
        <div className="text-right font-bold text-xl mt-4">
          Total: ₹{totalPrice.toLocaleString()}
        </div>
      </div>

      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            placeholder="Delivery Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={4}
            required
          />
          <select
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option>Cash on Delivery</option>
            <option>UPI Payment</option>
            <option>Debit/Credit Card</option>
            <option>Net Banking</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded font-semibold mt-2"
          >
            Place Order ₹{totalPrice.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
}
