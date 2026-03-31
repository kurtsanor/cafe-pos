import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Sidebar";
import Topbar from "../components/navbar/Topbar";
import classes from "../styles/MainLayout.module.css";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );

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
