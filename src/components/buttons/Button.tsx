import { colors } from "../../constants/colors";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        border: "none",
        borderRadius: 12,
        padding: "12px 20px",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
