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
  console.log("OrdersBody received orders:", orders);
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
                <Text>Id:</Text>
                <Text color={colors.primary}>{item.id}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text>Status:</Text>
                <Text
                  color={statusColors[item.status]}
                  style={{ textTransform: "capitalize" }}
                >
                  {item.status}
                </Text>
              </div>
              <Text>Total: ${item.total.toFixed(2)}</Text>
              <Text>Fecha: {new Date(item.timestamp).toLocaleString()}</Text>
              <div style={{ marginTop: 10 }}>
                <Text>Productos:</Text>
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
                      {product.name} - ${product.price} X {product.quantity} = $
                      {product.subtotal}
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
