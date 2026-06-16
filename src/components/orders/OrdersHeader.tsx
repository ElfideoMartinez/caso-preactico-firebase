import { spacing } from "../../constants/spacing";
import Card from "../cards/Card";
import Text from "../typography/Text";
interface OrdersHeaderProps {
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    role: string | null;
  } | null;
}

const OrdersHeader = ({ user }: OrdersHeaderProps) => {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
        <img
          src={user?.photoURL || "https://via.placeholder.com/80"}
          alt='User Avatar'
          style={{ width: 80, height: 80, borderRadius: "100%" }}
        />
        {user && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
            }}
          >
            <Text>Name: {user.displayName || "N/A"}</Text>
            <Text>Email: {user.email || "N/A"}</Text>
            <Text>Role: {user.role || "N/A"}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrdersHeader;
