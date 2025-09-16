import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", { state: { items: [{ ...product, quantity: 1 }] } });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-yellow-600 font-bold">₹{product.price}</p>
      <button
        onClick={handleBuyNow}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 mt-2 rounded-md w-full"
      >
        Buy Now
      </button>
    </div>
  );
}
export default ProductCard