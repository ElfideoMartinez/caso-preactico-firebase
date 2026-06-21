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
import {
  updateOrderStatusRTDB,
  requestOrderCancellationRTDB,
} from "../../services/firebase/realtimeDataBase";
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
    label: "Orden recibida",
  },
  active: {
    bg: colors.successLight,
    color: colors.success,
    label: "En preparación / En camino",
  },
  cancelled: {
    bg: colors.dangerLight,
    color: colors.danger,
    label: "Cancelada",
  },
  completed: {
    bg: colors.surfaceHover,
    color: colors.primary,
    label: "Entregada",
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
                    <div
                      style={{
                        display: "flex",
                        gap: spacing.sm,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
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
                      {item.cancelRequested && item.status !== "cancelled" && (
                        <span
                          style={{
                            background: colors.warningLight,
                            color: colors.warning,
                            padding: "4px 12px",
                            borderRadius: 999,
                            fontSize: typography.small,
                            fontWeight: 700,
                          }}
                        >
                          Cancelación solicitada
                        </span>
                      )}
                    </div>
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
                <OrderActions
                  orderId={item.id}
                  status={item.status}
                  role={role}
                  cancelRequested={item.cancelRequested}
                />
              </OrderCard>
            );
          })}
        </div>
      )}
    </Card>
  );
};
type OrderStatus = "pending" | "active" | "cancelled" | "completed";
interface OrderActionsProps {
  orderId: string;
  status?: OrderStatus;
  role?: string;
  cancelRequested?: boolean;
}

const confirmCancel = async () => {
  const result = await Swal.fire({
    title: "¿Cancelar orden?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar",
    cancelButtonText: "No",
    confirmButtonColor: colors.danger,
    cancelButtonColor: colors.textSecondary,
  });
  return result.isConfirmed;
};

const OrderActions = ({
  orderId,
  status = "pending",
  role,
  cancelRequested,
}: OrderActionsProps) => {
  const isAdmin = role === "admin";

  const cancelOrder = async (restore: boolean) => {
    if (!(await confirmCancel())) return;
    await updateOrderStatusRTDB(orderId, "cancelled");
    if (restore) {
      await addRemoveInventory(orderId, "increment");
    }
    Swal.fire("Orden cancelada", "La orden ha sido cancelada.", "success");
  };

  const markActive = async () => {
    await updateOrderStatusRTDB(orderId, "active");
    await addRemoveInventory(orderId, "decrement");
    Swal.fire("Orden activada", "La orden está en preparación.", "success");
  };

  const markDelivered = async () => {
    await updateOrderStatusRTDB(orderId, "completed");
    Swal.fire("Orden entregada", "La orden ha sido entregada.", "success");
  };

  const requestCancellation = async () => {
    const result = await Swal.fire({
      title: "¿Solicitar cancelación?",
      text: "Un administrador revisará tu solicitud.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Solicitar",
      cancelButtonText: "No",
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.textSecondary,
    });
    if (!result.isConfirmed) return;
    await requestOrderCancellationRTDB(orderId);
    Swal.fire(
      "Solicitud enviada",
      "Tu solicitud de cancelación fue enviada.",
      "success",
    );
  };

  const actions: {
    label: string;
    variant: ButtonVariant;
    onClick: () => Promise<void>;
  }[] = [];

  if (isAdmin) {
    if (status === "pending") {
      actions.push({
        label: "Marcar como activa",
        variant: "primaryButton",
        onClick: markActive,
      });
      actions.push({
        label: "Cancelar orden",
        variant: "dangerLightButton",
        onClick: () => cancelOrder(false),
      });
    } else if (status === "active") {
      actions.push({
        label: "Marcar como entregada",
        variant: "primaryButton",
        onClick: markDelivered,
      });
      actions.push({
        label: "Cancelar orden",
        variant: "dangerLightButton",
        onClick: () => cancelOrder(true),
      });
    } else if (status === "completed") {
      actions.push({
        label: "Cancelar orden",
        variant: "dangerLightButton",
        onClick: () => cancelOrder(true),
      });
    }
  } else {
    if (status === "pending") {
      actions.push({
        label: "Cancelar orden",
        variant: "dangerLightButton",
        onClick: () => cancelOrder(false),
      });
    } else if (status === "completed" && !cancelRequested) {
      actions.push({
        label: "Solicitar cancelación",
        variant: "lightButtonVariant",
        onClick: requestCancellation,
      });
    }
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: spacing.md,
  };

  if (!isAdmin && status === "completed" && cancelRequested) {
    return (
      <div style={containerStyle}>
        <Text size={typography.small} color={colors.textSecondary}>
          Cancelación solicitada
        </Text>
      </div>
    );
  }

  if (actions.length === 0) {
    return null;
  }

  return (
    <div style={containerStyle}>
      {actions.map((action, index) => (
        <Button variant={action.variant} key={index} onClick={action.onClick}>
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default OrdersBody;
