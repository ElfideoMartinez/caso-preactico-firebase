import Card from "../cards/Card";
import Text from "../typography/Text";
import OrderCard from "./OrderCard";
import { typography } from "../../constants/typography";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

interface OrdersBodyProps {
  orders: any[];
}

const OrdersBody = ({ orders }: OrdersBodyProps) => {
  const statusColors: { [key: string]: string } = {
    pending: colors.warning,
    active: colors.success,
    cancelled: colors.danger,
    completed: colors.primary,
  };
  return (
    <Card>
      {orders.length === 0 ? (
        <Text>No hay órdenes.</Text>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: spacing.md }}
        >
          {orders.map((item, index) => (
            <OrderCard key={index} variant={item.status}>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text weight={700}>Id:</Text>
                <Text color={colors.primary}>{item.id}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text weight={700}>Status:</Text>
                <Text
                  color={statusColors[item.status]}
                  style={{ textTransform: "capitalize" }}
                >
                  {item.status}
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text weight={700}>Total:</Text>
                <Text>${item.total.toFixed(2)}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text weight={700}>Fecha:</Text>
                <Text>{new Date(item.timestamp).toLocaleString()}</Text>
              </div>
              <div style={{ marginTop: 10 }}>
                <Text weight={700}>Productos:</Text>
                <>
                  {item.cart.map((product: any, idx: number) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: spacing.sm,
                        padding: spacing.sm,
                      }}
                      key={idx}
                    >
                      <Text>
                        {product.name} - ${product.price} X {product.quantity} =
                        ${product.subtotal}
                      </Text>
                      {product.description && (
                        <Text size={typography.small}>
                          {product.description}
                        </Text>
                      )}
                    </div>
                  ))}
                </>
              </div>
            </OrderCard>
          ))}
        </div>
      )}
    </Card>
  );
};

export default OrdersBody;
