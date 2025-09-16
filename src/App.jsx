import { Route,Routes,Link, Router } from "react-router-dom" 
import { StoreProvider } from "./StoreContext"
import Register from "./RegisterPage" 
import Login from "./LoginPage" 
import Home from "./Home " 
import Navbar from "./Navbar" 
import ProductsPage from "./Products" 
import Wishlist from "./Wishlist"
import CartPage from "./Cart"
import Checkout from "./Checkout"
import ProductCard from "./BuyNow"
function App() 
{
 const currentUserId = 3
 return ( 
      <StoreProvider userId={currentUserId}>
       
  <div> 
  <nav>
     <Navbar/> 
  </nav> 
  <Routes> <Route path="/" element={<Home/>}/> 
  <Route path="/register" element={<Register/>}/> 
  <Route path="/login" element={<Login/>}/> 
  <Route path="/products" element={<ProductsPage />} /> 
  <Route path="/wishlist" element={<Wishlist />} /> 
   <Route path="/cart" element={<CartPage />} /> 
    <Route path="/checkout" element={<Checkout />} /> 
    <Route path="/productcart" element={<ProductCard />} /> 
  </Routes> </div>
  </StoreProvider>  
  )} 
  export default App