import { colors } from "../../constants/colors";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
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
