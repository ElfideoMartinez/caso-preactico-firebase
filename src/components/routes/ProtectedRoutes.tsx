import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react/jsx-runtime";
import Text from "../typography/Text";
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
  //if no allowed role is specified, allow any authenticated user
  if (!allowedRoles || (userData && userData.role === "admin")) {
    return children;
  }
  if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
    return <Navigate to='/not-allowed' state={{ from: location }} replace />;
  }
  if (loading) {
    return <Text>Loading authentication state...</Text>;
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
