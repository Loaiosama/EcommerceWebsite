// App.jsx
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import NavBar from "./components/navBar";
import Women from "./pages/women";
import Men from "./pages/men";
import Kids from "./pages/kids";
import ProductPage from "./pages/productPage";
import "./App.css";

function ProductPageWrapper(props) {
  const { id } = useParams();
  return <ProductPage {...props} productId={id} />;
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/:category/:id" element={<ProductPageWrapper />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="*" element={<Navigate to="/women" />} />
      </Routes>
    </>
  );
}

export default App;
