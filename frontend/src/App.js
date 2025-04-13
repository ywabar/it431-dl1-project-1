import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./pages/home";
import ProductsComponent, {
  CreateProductComponent,
  ModifyProductComponent,
} from "./pages/products";
import { ToastContainer } from "react-toast";
import axios from "axios";
import { UserContext, UserContextProvider } from "./userContext";
import LoginComponent, {
  AccountComponent,
  RegisterComponent,
} from "./pages/login";
import { useContext } from "react";
import Navbar from "./Navbar";

axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/products" element={<ProductsComponent />} />
            <Route
              path="/products/create"
              element={<CreateProductComponent />}
            />
            <Route path="/products/:id" element={<ModifyProductComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/account" element={<AccountComponent />} />
          </Routes>
        </Router>
        <ToastContainer position="top-center" />
      </div>
    </UserContextProvider>
  );
}

export default App;
