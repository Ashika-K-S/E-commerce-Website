import { Route,Routes,Link, Router } from "react-router-dom"
import Register from "./RegisterPage"
import Login from "./LoginPage"
import Home from "./Home "
import Navbar from "./Navbar"
function App() {

  return (
    <div>
      <nav>
        <Navbar/>
       </nav>
    <Routes>
    
      <Route path="/" element={<Home/>}/>

      <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       
    </Routes>
    </div>
  )
}

export default App
