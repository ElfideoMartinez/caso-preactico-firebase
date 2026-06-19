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
        fontSize: typography.body,
        color: colors.textSecondary,
        padding: spacing.md,
        borderRadius: spacing.sm,
        border: "none",
      }}
      onChange={async (e) => {
        setIsLoading(true);
        await onChange(e.target.value);
        setIsLoading(false);
      }}
    >
      {initialValue ? (
        <option selected value={initialValue}>
          {initialValue}
        </option>
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
