import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import Text from "../typography/Text";
import { roleHome, type RoleOptions } from "../../constants/roles";

const RoleRedirect = () => {
  const { user, loading } = useAuth();
  const { userData } = useCart();
  if (loading || (user && !userData)) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return (
    <Navigate to={roleHome[userData.role as RoleOptions] || "/productos"} replace />
  );
};

export default RoleRedirect;
