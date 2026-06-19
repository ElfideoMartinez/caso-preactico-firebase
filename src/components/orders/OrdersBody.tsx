import Card from "../cards/Card";
import Text from "../typography/Text";
import OrderCard from "./OrderCard";
import { typography } from "../../constants/typography";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useCart } from "../../contexts/CartContext";
import Button from "../buttons/Button";
import Swal from "sweetalert2";
import type { ButtonVariant } from "../buttons/Button";
import { updateOrderStatusRTDB } from "../../services/firebase/realtimeDataBase";

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
                <Text>${item.total?.toFixed(2) || "0.00"}</Text>
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
                  {item.cart?.map((product: any, idx: number) => (
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
                        ${product.subtotal?.toFixed(2) || "0.00"}
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
type OrderStatus = "pending" | "active" | "cancelled" | "completed";
interface AdminOrdersBodyProps {
  orderId: any;
  status?: OrderStatus;
}
const AdminOrdersBody = ({
  orderId,
  status = "pending",
}: AdminOrdersBodyProps) => {
  const statusColors: { [key in OrderStatus]: ButtonVariant } = {
    pending: "primaryButton",
    active: "lightButtonVariant",
    cancelled: "warningLightButton",
    completed: "dangerLightButton",
  };
  const statusActions: { [key in OrderStatus]: any[] } = {
    pending: [
      {
        label: "Marcar como Activa",
        color: statusColors[status as OrderStatus],
        icon: "check",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "active");
          Swal.fire(
            "Exito",
            `La orden ${orderId} ha sido marcada como activa exitosamente.`,
            "success",
          );
        },
      },
    ],
    active: [
      {
        label: "Cancelar Orden",
        color: statusColors["completed"],
        icon: "times",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "cancelled");
          await Swal.fire(
            "Exito",
            `La orden ${orderId} ha sido cancelada exitosamente.`,
            "success",
          );
        },
      },
      {
        label: "Marcar como Realizada",
        color: statusColors["pending"],
        icon: "check",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "completed");
          Swal.fire(
            "Exito",
            `La orden ${orderId} ha sido marcada como completada exitosamente.`,
            "success",
          );
        },
      },
    ],
    cancelled: [
      {
        label: "Cancelar Orden",
        color: statusColors["cancelled"],
        icon: "times",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "cancelled");
          Swal.fire(
            "Exito",
            `La orden ${orderId} ha sido cancelada exitosamente.`,
            "success",
          );
        },
      },
    ],
    completed: [
      {
        label: "Realizar Devolución",
        color: statusColors["cancelled"],
        icon: "check",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "cancelled");
          await Swal.fire(
            "Exito",
            `La orden ${orderId} ha sido cancelada exitosamente.`,
            "success",
          );
        },
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: spacing.lg,
        marginRight: spacing.lg,
        marginTop: spacing.lg,
        borderTop: `1px solid ${colors.border}`,
        padding: spacing.lg,
      }}
    >
      {statusActions[status as OrderStatus]?.map((action, index) => (
        <Button variant={action.color} key={index} onClick={action.function}>
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default OrdersBody;
