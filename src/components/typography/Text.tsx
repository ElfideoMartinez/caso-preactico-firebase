import { colors } from "../../constants/colors";

type TextProps = {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
};

function Text({
  children,
  size = 16,
  weight = 400,
  color = colors.text,
  style = {},
}: TextProps) {
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Text;
