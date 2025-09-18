import { Route,Routes,Link, Router, BrowserRouter } from "react-router-dom" 
import { StoreProvider } from "./Context/StoreContext"
import Register from "./Pages/RegisterPage" 
import Login from "./Pages/LoginPage" 
import Home from "./Pages/Home " 
import Navbar from "./Pages/Navbar" 
import ProductsPage from "./Pages/Products" 
import Wishlist from "./Pages/Wishlist"
import CartPage from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import ProductCard from "./Pages/BuyNow"
import Footer from "./Pages/Footer"
import { AuthProvider } from "./Context/AuthContext"
function App() 
{ 
   const currentUserId = 3 
   return ( 
   <StoreProvider userId={currentUserId}> 
   <AuthProvider>
   <div> 
      
      <Routes> 
            <Route path="/" element={<Home/>}/> 
            <Route path="/register" element={<Register/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/products" element={<ProductsPage />} /> 
            <Route path="/wishlist" element={<Wishlist />} /> 
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/productcart" element={<ProductCard />} /> 
            </Routes> 
          
            </div> 
            </AuthProvider>
            </StoreProvider> 
            )} 
            export default App