import { spacing } from "../../constants/spacing";
import { colors } from "../../constants/colors";
import Text from "../typography/Text";
import { typography } from "../../constants/typography";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select
      style={{
        fontSize: typography.body,
        color: colors.textSecondary,
        padding: spacing.md,
        borderRadius: spacing.sm,
        border: `1px solid ${colors.border}`,
      }}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>
        <Text size={typography.h1}>Seleccionar rol</Text>
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          <Text size={typography.h1}>{option.label}</Text>
        </option>
      ))}
    </select>
  );
};

export default Select;
