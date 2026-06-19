import { typography } from "../../constants/typography";
import Card from "../cards/Card";
import Text from "../typography/Text";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

const OrderCard = ({
  children,
  variant = "pending",
}: {
  children?: React.ReactNode;
  variant?: "pending" | "active" | "cancelled" | "completed";
}) => {
  const cardStyles = {
    pending: {
      background: colors.softGradients.warning,
      border: `1px solid ${colors.warning}`,
    },
    active: {
      background: colors.softGradients.success,
      border: `1px solid ${colors.success}`,
    },
    cancelled: {
      background: colors.softGradients.danger,
      border: `1px solid ${colors.danger}`,
    },
    completed: {
      background: colors.softGradients.primary,
      border: `1px solid ${colors.primary}`,
    },
  };
  return (
    <Card
      style={{
        ...cardStyles[variant],
        marginBottom: spacing.sm,
        display: "flex",
        flexDirection: "column",
        gap: spacing.sm,
      }}
    >
      <>
        <Text size={typography.h3} weight={700}>
          Orden
        </Text>
        {children}
      </>
    </Card>
  );
};

export default OrderCard;
