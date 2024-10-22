import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import Women from "./pages/women";
import Men from "./pages/men";
import Kids from "./pages/kids";

// import Product from './pages/productPage'
import "./App.css";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/:category/:id" element={<ProductPage />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="*" element={<Navigate to="/women" />} />
      </Routes>
    </>
  );
}

export default App;
