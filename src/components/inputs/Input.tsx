import { colors } from "../../constants/colors";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.text,
        outline: "none",
        fontSize: 16,
      }}
    />
  );
}

export default Input;
