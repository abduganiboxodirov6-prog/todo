import { Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import Header from "./widgets/header/Header";
import Product from "./pages/product/Product.tsx";
import UsersPage from "./pages/tanStack/TanStack.tsx";

function App() {
  const handleEdit = () => {
    alert("Edit qilindi");
  };

  return (
    <div>
      {/* Header har doim ko'rinib turadi */}
      <Header
        title="Meva do'kon"
        count={10}
        onSale={true}
        onEdit={handleEdit}
      />

         
      {/* Sahifalar orasidagi almashinuv */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/tanStack" element={<UsersPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;