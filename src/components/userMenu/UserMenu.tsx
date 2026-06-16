import { useState } from "react";
import { colors } from "../../constants/colors";
import { logout } from "../../services/firebase/authServices";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        👤
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 50,
            width: 180,
            background: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            boxShadow: `0 8px 20px ${colors.shadow}`,
            overflow: "hidden",
          }}
        >
          <button style={menuStyle}>Profile</button>

          <button style={menuStyle}>Settings</button>

          <button
            style={{
              ...menuStyle,
              color: colors.danger,
            }}
            onClick={async () => {
              try {
                await logout();
                navigate("/login");
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const menuStyle = {
  width: "100%",
  padding: 16,
  border: "none",
  background: "transparent",
  textAlign: "left" as const,
  cursor: "pointer",
};

export default UserMenu;
