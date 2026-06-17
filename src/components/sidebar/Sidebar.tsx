import { NavLink } from "react-router-dom";
import { colors } from "../../constants/colors";

function Sidebar() {
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
          Productos
        </NavLink>
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
          Users
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
