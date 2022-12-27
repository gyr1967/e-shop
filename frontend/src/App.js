import Nav from "./components/utils/nav";
import Footer from "./components/utils/footer";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import AddProduct from "./components/pages/addproduct";
import PrivateComponent from "./components/utils/PrivateComponent";
import Products from "./components/pages/products";
import UpdateProduct from "./components/pages/updateProduct";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/" element={<Products/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<h1>Logout page</h1>} />
          <Route path="/profile" element={<h1>Profile page</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
