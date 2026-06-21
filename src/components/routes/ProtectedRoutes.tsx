import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react/jsx-runtime";
import Loader from "../loaders/Loader";
import { useCart } from "../../contexts/CartContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: string[];
}) => {
  const { user, loading } = useAuth();
  const { userData } = useCart();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  //if no allowed role is specified, allow any authenticated user
  if (!allowedRoles) {
    return children;
  }
  if (!userData) {
    return <Loader />;
  }
  if (userData.role === "admin") {
    return children;
  }
  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to='/not-allowed' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
