import { spacing } from "../../constants/spacing";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void | Promise<void>;
  initialValue?: string;
}

const Select = ({ options, onChange, initialValue }: SelectProps) => {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ClipLoader color={colors.primary} size={50} />
      </div>
    );
  }
  return (
    <select
      style={{
        width: "100%",
        fontSize: typography.body,
        color: colors.text,
        padding: "10px 14px",
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
        cursor: "pointer",
        outline: "none",
      }}
      onChange={async (e) => {
        setIsLoading(true);
        await onChange(e.target.value);
        setIsLoading(false);
      }}
    >
      {initialValue ? (
        <option defaultValue={initialValue}>{initialValue}</option>
      ) : (
        <option value=''>Seleccionar rol</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
