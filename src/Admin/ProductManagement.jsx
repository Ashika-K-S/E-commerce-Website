import React, { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../Pages/Protect";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false }); 

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchProducts(), []);

 
  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.id) return;
    axios
      .post("http://localhost:5000/products", {
        ...newProduct,
        price: Number(newProduct.price),
      })
      .then(() => {
        setNewProduct({ id: "", name: "", description: "", price: "", image: "" });
        fetchProducts();
        showToast("Product added successfully!");
      });
  };

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:5000/products/${id}`).then(() => {
        fetchProducts();
        showToast("Product deleted successfully!");
      });
    }
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };


  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || "",
    });
  };

  
  const handleUpdate = () => {
    axios
      .patch(`http://localhost:5000/products/${editingProduct.id}`, {
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        image: newProduct.image,
      })
      .then(() => {
        setEditingProduct(null);
        setNewProduct({ id: "", name: "", description: "", price: "", image: "" });
        fetchProducts();
        showToast("Product updated successfully!");
      });
  };


  const handleCancel = () => {
    setEditingProduct(null);
    setNewProduct({ id: "", name: "", description: "", price: "", image: "" });
  };

  return (
    <div className="p-6 relative">
    
      {toast.visible && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
          {toast.message}
        </div>
      )}

     
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border px-3 py-2 rounded mb-3 w-full"
        />

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          {!editingProduct && (
            <input
              type="text"
              placeholder="Product ID"
              value={newProduct.id}
              onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
              className="border px-3 py-2 rounded"
            />
          )}

          <div className="flex gap-3">
            <button
              onClick={editingProduct ? handleUpdate : handleAdd}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              {editingProduct ? "Update" : "Submit"}
            </button>
            {editingProduct && (
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

   
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Products</h2>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-purple-50">
            <tr>
              <th className="py-2 px-3 border-b text-purple-700">ID</th>
              <th className="py-2 px-3 border-b text-purple-700">Name</th>
              <th className="py-2 px-3 border-b text-purple-700">Description</th>
              <th className="py-2 px-3 border-b text-purple-700">Price</th>
              <th className="py-2 px-3 border-b text-purple-700">Image</th>
              <th className="py-2 px-3 border-b text-purple-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-purple-50 transition">
                <td className="py-2 px-3 border-b">{p.id}</td>
                <td className="py-2 px-3 border-b">{p.name}</td>
                <td className="py-2 px-3 border-b">{p.description}</td>
                <td className="py-2 px-3 border-b">₹{p.price}</td>
                <td className="py-2 px-3 border-b">
                  {p.image && <img src={p.image} alt={p.name} className="w-12 h-12 rounded" />}
                </td>
                <td className="py-2 px-3 border-b flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
