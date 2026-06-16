import { colors } from "../../constants/colors";
import UserMenu from "../userMenu/UserMenu";

type HeaderProps = {
  onToggleSidebar: () => void;
};

function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header
      style={{
        height: 70,
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button onClick={onToggleSidebar}>☰</button>

        <h2
          style={{
            color: colors.secondary,
          }}
        >
          My App
        </h2>
      </div>

      <UserMenu />
    </header>
  );
}

export default Header;
