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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addRemoveInventory } from "../../services/firebase/products/addRemoveInventory";

interface OrdersBodyProps {
  orders: any[];
}

const statusStyles: {
  [key: string]: { bg: string; color: string; label: string };
} = {
  pending: {
    bg: colors.warningLight,
    color: colors.warning,
    label: "Pendiente",
  },
  active: { bg: colors.successLight, color: colors.success, label: "Activa" },
  cancelled: {
    bg: colors.dangerLight,
    color: colors.danger,
    label: "Cancelada",
  },
  completed: {
    bg: colors.surfaceHover,
    color: colors.primary,
    label: "Completada",
  },
};

const OrdersBody = ({ orders }: OrdersBodyProps) => {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const { role } = useCart().userData || {};
  return (
    <Card>
      {orders.length === 0 ? (
        <Text color={colors.textSecondary}>No hay órdenes todavía.</Text>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: spacing.md }}
        >
          {orders.map((item, index) => {
            const badge = statusStyles[item.status] || statusStyles.pending;
            const isOpen = openCardIndex === index;
            return (
              <OrderCard key={index} variant={"light"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: spacing.md,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.xs,
                    }}
                  >
                    <span
                      style={{
                        alignSelf: "flex-start",
                        background: badge.bg,
                        color: badge.color,
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: typography.small,
                        fontWeight: 700,
                      }}
                    >
                      {badge.label}
                    </span>
                    <Text size={typography.small} color={colors.textSecondary}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text size={typography.small} color={colors.textSecondary}>
                      Total
                    </Text>
                    <Text
                      size={typography.h2}
                      weight={700}
                      color={colors.primary}
                    >
                      ${item.total?.toFixed(2) || "0.00"}
                    </Text>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: spacing.sm,
                    alignItems: "center",
                  }}
                >
                  <Text
                    size={typography.small}
                    weight={600}
                    color={colors.textSecondary}
                  >
                    ID:
                  </Text>
                  <Text
                    size={typography.small}
                    color={colors.textSecondary}
                    style={{ fontFamily: "monospace" }}
                  >
                    {item.id}
                  </Text>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${colors.border}`,
                    paddingTop: spacing.sm,
                  }}
                >
                  <div
                    onClick={() => setOpenCardIndex(isOpen ? null : index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: spacing.sm,
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ color: colors.textSecondary }}
                      icon={isOpen ? faChevronUp : faChevronDown}
                    />
                    <Text weight={700}>
                      Productos ({item.cart?.length || 0})
                    </Text>
                  </div>
                  {isOpen && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: spacing.sm,
                        marginTop: spacing.sm,
                      }}
                    >
                      {item.cart?.map((product: any, idx: number) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: spacing.md,
                            background: colors.surface,
                            borderRadius: 12,
                            padding: spacing.md,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: spacing.xs,
                            }}
                          >
                            <Text size={typography.body} weight={600}>
                              {product.name}
                            </Text>
                            <Text
                              size={typography.small}
                              color={colors.textSecondary}
                            >
                              ${product.sellingPrice} × {product.quantity}
                            </Text>
                            {product.description && (
                              <Text
                                size={typography.small}
                                color={colors.textDisabled}
                              >
                                {product.description}
                              </Text>
                            )}
                          </div>
                          <Text size={typography.body} weight={700}>
                            $
                            {(product.sellingPrice * product.quantity).toFixed(
                              2,
                            )}
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {role === "admin" && (
                  <AdminOrdersBody orderId={item.id} status={item.status} />
                )}
              </OrderCard>
            );
          })}
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
          await addRemoveInventory(orderId, "decrement");
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
        color: statusColors["cancelled"],
        icon: "times",
        function: async () => {
          await updateOrderStatusRTDB(orderId, "cancelled");
          await addRemoveInventory(orderId, "increment");
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
