import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; 
import { useStore } from "../Context/StoreContext";

const OrderPage = () => {
  const { cart, setCart } = useStore();
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);
  const fetchUserOrders = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:5000/orders");
      const userOrders = res.data.filter(o => o.userId === user.id);
      setOrders(userOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const placeOrder = async () => {
    if (!user) return alert("You must be logged in to place an order.");
    if (cart.length === 0) return alert("Cart is empty");

    const newOrder = {
      userId: user.id,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date().toISOString().split("T")[0],
      status: "pending"
    };

    try {
      await axios.post("http://localhost:5000/orders", newOrder);
      setCart([]);
      alert("Order placed successfully!");
      fetchUserOrders(); 
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  if (!user) return <p className="text-center mt-10">Please log in to see your orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      <button
        onClick={placeOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Place Order
      </button>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-4 mb-2 rounded">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
