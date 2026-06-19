import { useEffect, useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import { useAuth } from "../contexts/AuthContext";
import OrdersBody from "../components/orders/OrdersBody";
import { spacing } from "../constants/spacing";
import Text from "../components/typography/Text";
import { getUserOrdersRTDB } from "../services/firebase/realtimeDataBase";
import { useCart } from "../contexts/CartContext";
import { typography } from "../constants/typography";

const PedidosPage = () => {
  const { user, loading } = useAuth();
  const { userData } = useCart();
  const [userOrders, setUserOrders] = useState<any>(null);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
        padding: spacing.lg,
      }}
    >
      <Text size={typography.h1} weight={700}>
        Pedidos
      </Text>
      <OrdersHeader user={userData as any} />
      <OrdersBody orders={userOrders || []} />
    </div>
  );
};

export default PedidosPage;
