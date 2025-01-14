import Home from "./components/Home";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
