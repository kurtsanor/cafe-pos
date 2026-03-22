import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Sidebar";
import Topbar from "../components/navbar/Topbar";
import classes from "../styles/MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <main className={classes.main}>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
