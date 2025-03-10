import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./pages/home";
import ProductsComponent from "./pages/products";

function App() {
  return (
    <div className="App">
      <nav>
        <div>
          <h1 className="bg-orange">IT431-DL1 Project 1</h1>
        </div>
        <div>
          <a
            href="/"
            className={document.location.pathname == "/" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="/products"
            className={
              document.location.pathname.includes("/products") ? "active" : ""
            }
          >
            Products
          </a>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/products" element={<ProductsComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
