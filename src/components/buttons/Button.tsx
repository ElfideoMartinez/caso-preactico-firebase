import { useState } from "react";
import { colors } from "../../constants/colors";
import Text from "../typography/Text";
import { ClipLoader } from "react-spinners";

export type ButtonVariant = Extract<
  keyof typeof colors,
  | "primaryButton"
  | "warningLightButton"
  | "dangerLightButton"
  | "lightButtonVariant"
  | "greenButtonVariant"
  | "disabledButtonVariant"
>;

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  variant?: ButtonVariant;
};

function Button({
  children,
  onClick,
  disabled,
  variant = "primaryButton",
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const styles = colors[variant];
  return (
    <button
      onClick={async () => {
        if (onClick) {
          setIsLoading(true);
          try {
            await onClick();
          } finally {
            setIsLoading(false);
          }
        }
      }}
      disabled={disabled || isLoading}
      style={styles as React.CSSProperties}
    >
      {isLoading ? (
        <ClipLoader color='#fff' size={20} />
      ) : (
        <Text color={styles.text}>{children}</Text>
      )}
    </button>
  );
}

export default Button;
