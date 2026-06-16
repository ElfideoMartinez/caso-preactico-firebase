import { useEffect, useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import { getUserData } from "../services/firebase/users";
import { useAuth } from "../contexts/AuthContext";
import OrdersBody from "../components/orders/OrdersBody";
import { spacing } from "../constants/spacing";

const PedidosPage = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    document.title = "Pedidos - Innovate Solutions";
  }, []);
  useEffect(() => {
    fetchUserData();
  }, [user]);
  const fetchUserData = async () => {
    try {
      console.log("Fetching user data for UID:", user?.uid);
      if (user?.uid) {
        const data = await getUserData(user.uid);
        console.log("Fetched user data:", data);
        setUserData(data);
      } else {
        console.warn("No user UID available to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
      <OrdersHeader user={userData} />
      <OrdersBody cart={userData?.orders || []} />
    </div>
  );
};

export default PedidosPage;
