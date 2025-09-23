import React, { useEffect, useState } from "react";
import ProtectedRoute from "../Pages/Protect";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const DashboardHome = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/orders").then((res) => setOrders(res.data));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => {
    if (!order.items || !Array.isArray(order.items)) return sum;
    return sum + order.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  }, 0);

  const revenueData = products.map((product) => {
    const productRevenue = orders.reduce((acc, order) => {
      if (!order.items) return acc;
      const item = order.items.find((i) => i.id === product.id);
      return acc + (item ? item.price * item.quantity : 0);
    }, 0);
    return { name: product.name, revenue: productRevenue };
  });

  const recentOrders = orders
    .slice(-5)
    .reverse()
    .map((order) => ({
      ...order,
      userName: users.find((u) => u.id === order.userId)?.name || "Unknown",
    }));

  const topProducts = [...revenueData].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const barColors = ["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"];

  const pieColors = ["#3B82F6", "#60A5FA", "#2563EB", "#1D4ED8", "#1E40AF"];

  
  const pieData = revenueData.filter((item) => item.revenue > 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-purple-700">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Orders</h2>
          <p className="text-2xl font-bold text-purple-700">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Revenue</h2>
          <p className="text-2xl font-bold text-purple-700">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-gray-500 mb-2">Total Products</h2>
          <p className="text-2xl font-bold text-purple-700">{products.length}</p>
        </div>
      </div>

      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
            <YAxis tick={{ fill: "#4B5563" }} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {revenueData.map((entry, index) => (
                <Cell key={index} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Revenue Share</h2>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No revenue data yet</p>
        )}
      </div>

      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Top Selling Products</h2>
        {topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topProducts} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {topProducts.map((entry, index) => (
                  <Cell key={index} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No products sold yet</p>
        )}
      </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-purple-50">
            <tr>
              <th className="py-2 px-4 border-b text-purple-700">User</th>
              <th className="py-2 px-4 border-b text-purple-700">Order ID</th>
              <th className="py-2 px-4 border-b text-purple-700">Total</th>
              <th className="py-2 px-4 border-b text-purple-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-50 transition">
                <td className="py-2 px-4 border-b">{order.userName}</td>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  ${order.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
