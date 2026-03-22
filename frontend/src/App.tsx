import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Menu from "./pages/Menu";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
