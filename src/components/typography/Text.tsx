import { colors } from "../../constants/colors";

type TextProps = {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
};

function Text({
  children,
  size = 16,
  weight = 400,
  color = colors.text,
}: TextProps) {
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
      }}
    >
      {children}
    </span>
  );
}

export default Text;
