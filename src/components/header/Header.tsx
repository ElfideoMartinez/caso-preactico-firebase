import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import UserMenu from "../userMenu/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  onToggleSidebar: () => void;
};

function Header({ onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header
      style={{
        height: 70,
        background: colors.backgroundColor,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Button onClick={onToggleSidebar}>
          <FontAwesomeIcon icon={faBars} size='1x' color='#fff' />
        </Button>

        <h2
          onClick={() => navigate("/productos")}
          style={{
            cursor: "pointer",
            color: colors.secondary,
          }}
        >
          Comercializadora Nova
        </h2>
      </div>
      <UserMenu />
    </header>
  );
}

export default Header;
