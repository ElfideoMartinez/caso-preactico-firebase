import { colors } from "../../constants/colors";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 24,
        boxShadow: `0 4px 12px ${colors.shadow}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
