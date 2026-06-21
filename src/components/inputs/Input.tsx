import { colors } from "../../constants/colors";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ style, onFocus, onBlur, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
        color: colors.text,
        outline: "none",
        fontSize: 15,
        transition: "border-color 0.2s, box-shadow 0.2s",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = colors.primary;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.successLight}`;
        onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
        onBlur?.(e);
      }}
    />
  );
}

export default Input;
