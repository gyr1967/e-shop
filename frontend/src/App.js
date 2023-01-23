import Nav from "./components/utils/nav";
import Footer from "./components/utils/footer";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import AddProduct from "./components/pages/addproduct";
import PrivateComponent from "./components/utils/PrivateComponent";
import Products from "./components/pages/products";
import UpdateProduct from "./components/pages/updateProduct";
import UpdateEmail from "./components/pages/updateEmail";
import UpdatePassword from "./components/pages/updatePassword";
import Profile from "./components/pages/profile";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile/updateemail/:id" element={<UpdateEmail />} />
            <Route path="/profile/updatepassword/:id" element={<UpdatePassword />}/>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
