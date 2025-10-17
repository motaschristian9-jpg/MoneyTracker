import { Navigate, Outlet } from "react-router-dom";

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return !!token; // returns true if token exists
};

export default function PrivateRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
