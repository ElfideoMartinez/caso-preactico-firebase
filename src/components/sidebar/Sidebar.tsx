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
        <NavLink to='/'>Home</NavLink>

        <NavLink to='/products'>Products</NavLink>

        <NavLink to='/users'>Users</NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
