import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Menu />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
