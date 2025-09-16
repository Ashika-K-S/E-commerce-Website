import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
    navigate("/"); // redirect after payment
  };

  if (items.length === 0) return <p className="mt-20 p-6">No items to checkout.</p>;

  return (
    <div className="min-h-screen mt-20 p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p>{item.name}</p>
                <p>₹{Number(item.price).toLocaleString()} x {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold">₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}</p>
          </div>
        ))}
        <div className="text-right font-bold text-xl">Total: ₹{totalPrice.toLocaleString()}</div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={paymentDetails.name}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full"
          >
            Pay ₹{totalPrice.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
}
