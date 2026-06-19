import Card from "../cards/Card";
import Text from "../typography/Text";
import OrderCard from "./OrderCard";
import { typography } from "../../constants/typography";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useCart } from "../../contexts/CartContext";
import Button from "../buttons/Button";
import Swal from "sweetalert2";

interface OrdersBodyProps {
  orders: any[];
}

const OrdersBody = ({ orders }: OrdersBodyProps) => {
  const { role } = useCart().userData || {};
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
              {role === "admin" && (
                <AdminOrdersBody orderId={item.id} status={item.status} />
              )}
            </OrderCard>
          ))}
        </div>
      )}
    </Card>
  );
};
interface AdminOrdersBodyProps {
  orderId: any;
  status?: string;
}
const AdminOrdersBody = ({ orderId, status }: AdminOrdersBodyProps) => {
  const statusColors: { [key: string]: string } = {
    pending: colors.warning,
    active: colors.success,
    cancelled: colors.danger,
    completed: colors.primary,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginRight: spacing.lg,
        marginTop: spacing.lg,
        borderTop: `1px solid ${colors.border}`,
        paddingTop: spacing.lg,
      }}
    >
      <Button
        variant='greenButtonVariant'
        onClick={async () => {
          await Swal.fire(
            "Funcionalidad no implementada",
            `Esta funcionalidad aún no está implementada para la orden ${orderId}.`,
            "info",
          );
        }}
      >
        Marcar como Activa
      </Button>
      <Button
        onClick={async () => {
          await Swal.fire(
            "Funcionalidad no implementada",
            "Esta funcionalidad aún no está implementada.",
            "info",
          );
        }}
      >
        Filtrar por Status
      </Button>
      <Button
        onClick={async () => {
          await Swal.fire(
            "Funcionalidad no implementada",
            "Esta funcionalidad aún no está implementada.",
            "info",
          );
        }}
      >
        Filtrar por Fecha
      </Button>
    </div>
  );
};

export default OrdersBody;
