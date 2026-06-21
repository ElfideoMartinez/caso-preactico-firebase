import { NavLink } from "react-router-dom";
import { colors } from "../../constants/colors";
import { useCart } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faChartLine,
  faShoppingCart,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { allowedRoutesByRole, type RoleOptions } from "../../constants/roles";

const navLinks = [
  { to: "/pedidos", label: "Pedidos", icon: faShoppingCart },
  { to: "/productos", label: "Productos", icon: faBoxOpen },
  { to: "/inventory", label: "Inventory", icon: faWarehouse },
  { to: "/sales", label: "Ventas", icon: faChartLine },
  { to: "/users", label: "Users", icon: faUser },
];

function Sidebar() {
  const { userData } = useCart();
  const role = (userData?.role as RoleOptions) || "user";
  const allowedRoutes = allowedRoutesByRole[role] || [];
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
        {navLinks
          .filter((link) => allowedRoutes.includes(link.to))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: "12px 16px",
                borderRadius: 8,
                textDecoration: "none",
                color: isActive ? colors.primary : colors.text,
                background: isActive ? colors.primary + "20" : "transparent",
              })}
            >
              <FontAwesomeIcon icon={link.icon} style={{ marginRight: 8 }} />
              {link.label}
            </NavLink>
          ))}
      </div>
    </aside>
  );
}

export default Sidebar;
