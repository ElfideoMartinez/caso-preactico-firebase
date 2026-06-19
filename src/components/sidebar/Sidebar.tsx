import { NavLink } from "react-router-dom";
import { colors } from "../../constants/colors";
import { useCart } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faShoppingCart,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

type RoleOptions = "admin" | "user";

function Sidebar() {
  const { userData } = useCart();
  const allowedRoutesByRole: Record<RoleOptions, string[]> = {
    admin: ["/pedidos", "/productos", "/inventory", "/users"],
    user: ["/pedidos", "/productos"],
  };
  return (
    <aside
      style={{
        width: 250,
        background: colors.surface,
        borderRight: `1px solid ${colors.border}`,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <NavLink
          to='/pedidos'
          style={({ isActive }) => ({
            padding: "12px 16px",
            borderRadius: 8,
            textDecoration: "none",
            color: isActive ? colors.primary : colors.text,
            background: isActive ? colors.primary + "20" : "transparent",
          })}
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 8 }} />
          Pedidos
        </NavLink>
        <NavLink
          to='/productos'
          style={({ isActive }) => ({
            padding: "12px 16px",
            borderRadius: 8,
            textDecoration: "none",
            color: isActive ? colors.primary : colors.text,
            background: isActive ? colors.primary + "20" : "transparent",
          })}
        >
          <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: 8 }} />
          Productos
        </NavLink>
        {allowedRoutesByRole[
          (userData?.role as RoleOptions) || "user"
        ].includes("/inventory") && (
          <NavLink
            to='/inventory'
            style={({ isActive }) => ({
              padding: "12px 16px",
              borderRadius: 8,
              textDecoration: "none",
              color: isActive ? colors.primary : colors.text,
              background: isActive ? colors.primary + "20" : "transparent",
            })}
          >
            <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: 8 }} />
            Inventory
          </NavLink>
        )}
        {allowedRoutesByRole[
          (userData?.role as RoleOptions) || "user"
        ].includes("/users") && (
          <NavLink
            to='/users'
            style={({ isActive }) => ({
              padding: "12px 16px",
              borderRadius: 8,
              textDecoration: "none",
              color: isActive ? colors.primary : colors.text,
              background: isActive ? colors.primary + "20" : "transparent",
            })}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
            Users
          </NavLink>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
