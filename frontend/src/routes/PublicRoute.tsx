import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Center, Loader } from "@mantine/core";

const PublicRoute = () => {
  const { data: isLoggedIn, isLoading } = useAuth();

  if (isLoading)
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default PublicRoute;
