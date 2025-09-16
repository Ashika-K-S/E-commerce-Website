import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register(){
    const[data,setData]=useState(
        {
            name:"",
            email:"",
            password:"",
            cart:[],
            wishlist:[]
        }
    )
    const navigate = useNavigate();


    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
     e.preventDefault();
    try {
        await axios.post("http://localhost:5000/users", data);
        alert("Registered successfully! You can now login.");
        navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Something went wrong. Try again.");
                        }
    };


return (
  <div className="relative min-h-screen flex items-center justify-center">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center filter brightness-75 blur-sm"
      style={{
        backgroundImage:
          "url('')",
      }}
    ></div>

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Form container */}
    <div className="relative z-10 w-full max-w-md p-12 bg-white shadow-2xl rounded-3xl border border-gray-200">
      {/* LOREEZ Heading */}
      <div className="text-center mb-8 relative">
        <h1 className="text-5xl font-serif font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-white/50 transform -translate-x-full animate-shimmer"></span>
          LOREEZ
        </h1>

        {/* Golden shimmer line with glow */}
        <div className="mx-auto my-2 w-16 h-1 bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.6)]">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-30 transform -translate-x-full animate-shimmer"></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">jewellery</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={data.userName}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
        />
        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition duration-300"
        >
          <option value="user" className="bg-white text-black">
            User
          </option>
          <option value="admin" className="bg-white text-black">
            Admin
          </option>
        </select>

        {/* Shimmering golden button */}
        <button className="relative w-full bg-gradient-to-r from-[#D4AF37] via-[#C4972C] to-[#B8860B] text-white font-semibold py-4 rounded-xl shadow-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <span className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-20 transform -translate-x-full animate-shimmer"></span>
          Register
        </button>
      </form>

      {/* Redirect to login */}
      <p className="text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-black font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  </div>
);


}
export default Register