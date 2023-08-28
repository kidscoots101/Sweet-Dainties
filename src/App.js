import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Cart from "./components/Cart";
import Product from "./components/Product";

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product" element={<Product />} />
  </Routes>
  </Router>
  );
}

export default App;
