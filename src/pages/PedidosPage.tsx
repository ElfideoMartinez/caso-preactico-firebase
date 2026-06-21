import { useEffect, useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import { useAuth } from "../contexts/AuthContext";
import OrdersBody from "../components/orders/OrdersBody";
import { spacing } from "../constants/spacing";
import Text from "../components/typography/Text";
import { getUserOrdersRTDB } from "../services/firebase/realtimeDataBase";
import { useCart } from "../contexts/CartContext";
import { typography } from "../constants/typography";
import { colors } from "../constants/colors";

const PedidosPage = () => {
  const { user, loading } = useAuth();
  const { userData } = useCart();
  const [userOrders, setUserOrders] = useState<any>(null);
  const [tab, setTab] = useState<"active" | "inactive">("active");

  useEffect(() => {
    document.title = "Pedidos - Innovate Solutions";
  }, []);
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = getUserOrdersRTDB(
      userData?.uid,
      userData?.role,
      (orders) => {
        setUserOrders(orders);
      },
    );

    return () => unsubscribe();
  }, [user, userData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const orders = userOrders || [];
  const activeOrders = orders.filter(
    (o: any) => o.status === "pending" || o.status === "active",
  );
  const inactiveOrders = orders.filter(
    (o: any) => o.status === "cancelled" || o.status === "completed",
  );
  const visibleOrders = tab === "active" ? activeOrders : inactiveOrders;

  const tabStyle = (selected: boolean) => ({
    background: selected ? colors.primary : colors.surface,
    color: selected ? colors.white : colors.textSecondary,
    border: `1px solid ${selected ? colors.primary : colors.border}`,
    borderRadius: 999,
    padding: "8px 20px",
    fontSize: typography.body,
    fontWeight: 600,
    cursor: "pointer",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
        padding: spacing.lg,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
        <Text size={typography.h1} weight={700}>
          Pedidos
        </Text>
        <Text color={colors.textSecondary}>
          {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
        </Text>
      </div>
      <OrdersHeader user={userData as any} />
      <div style={{ display: "flex", gap: spacing.sm }}>
        <button onClick={() => setTab("active")} style={tabStyle(tab === "active")}>
          Activos ({activeOrders.length})
        </button>
        <button
          onClick={() => setTab("inactive")}
          style={tabStyle(tab === "inactive")}
        >
          Inactivos ({inactiveOrders.length})
        </button>
      </div>
      <OrdersBody orders={visibleOrders} />
    </div>
  );
};

export default PedidosPage;
