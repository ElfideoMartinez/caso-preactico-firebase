import { useEffect, useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import { useAuth } from "../contexts/AuthContext";
import OrdersBody from "../components/orders/OrdersBody";
import { spacing } from "../constants/spacing";
import Text from "../components/typography/Text";
import { getUserOrdersRTDB } from "../services/firebase/realtimeDataBase";

const PedidosPage = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    document.title = "Pedidos - Innovate Solutions";
  }, []);
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = getUserOrdersRTDB(user.uid, (orders) => {
      console.log("Orders updated:", orders);
      setUserData(orders);
    });

    return () => unsubscribe();
  }, [user]);

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
      <OrdersHeader user={user as any} />
      <OrdersBody orders={userData || []} />
    </div>
  );
};

export default PedidosPage;
