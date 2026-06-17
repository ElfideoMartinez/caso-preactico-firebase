import { colors } from "../../constants/colors";
import Text from "../typography/Text";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primaryButton" | "greenButtonVariant";
};

function Button({
  children,
  onClick,
  disabled,
  variant = "primaryButton",
}: ButtonProps) {
  const styles = colors[variant as keyof typeof colors] || colors.primary;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={styles as React.CSSProperties}
    >
      <Text color={"#fff"}>{children}</Text>
    </button>
  );
}

export default Button;
