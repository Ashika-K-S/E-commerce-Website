import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-yellow-400 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to LOREEZ Jewellery
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Discover elegant designs and timeless pieces
        </p>
        <Link to="/products">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Featured Collections */}
      <section className="py-16 container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/934717802/photo/traditional-indian-gold-necklace-with-earrings.jpg?s=612x612&w=0&k=20&c=j67MP0xFYPgRsUcZ4EjFIO3EMUV97S54bzIPBjNv06c="
              alt="Necklaces"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Necklaces</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/1011590288/photo/luxury-diamond-ring-in-jewelry-box-vintage-style.jpg?s=612x612&w=0&k=20&c=kclwqgkNjDyT7PlnPXqU2Dql1PIzYVUf1MV-TRED8uw="
              alt="Rings"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Rings</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/1296634658/photo/indian-traditional-gold-wedding-earrings-on-wooden-box.jpg?s=612x612&w=0&k=20&c=I50vTgqCA1j3t9R09qk1xIjn72lLxi_prB9kQAXFdz4="
              alt="Earrings"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Earrings</p>
          </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/488548516/photo/wedding-gold-bracelets.jpg?s=612x612&w=0&k=20&c=XoNrzSBDOhllLJ3hlSgS526px-bGI7wCyiZPCgk2fxg="
              alt="Bangles"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Bangles</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/494758438/photo/necklace-made-of-white-gold-with-diamonds-on-a-stand.jpg?s=612x612&w=0&k=20&c=fMufoAed2ChmurgbuAqUepdYPCt5ZjN1_qMTyk-ExQM="
              alt="Product 1"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Necklace</p>
            <p className="text-yellow-600 font-bold">$1299</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://media.istockphoto.com/id/525219470/photo/metal-diamond-hair-ring.jpg?s=612x612&w=0&k=20&c=7mNNhGZGApExDowiAezZqE24vVWtoHloI8vWsM3KH7I="
              alt="Product 2"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold">Gold Bracelet</p>
            <p className="text-yellow-600 font-bold">$890</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
