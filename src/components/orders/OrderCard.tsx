import { typography } from "../../constants/typography";
import Text from "../typography/Text";

const OrderCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 10, padding: 10 }}
    >
      <>
        <Text size={typography.small}>Orden</Text>
        {children}
      </>
    </div>
  );
};

export default OrderCard;
