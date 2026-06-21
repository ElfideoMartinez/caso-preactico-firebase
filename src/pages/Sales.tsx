import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { getAllOrders } from "../services/firebase/orders/getAllOrders";

const Sales = () => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    document.title = "Ventas - Comercializadora Nova";
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0,
  );
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Text size={typography.h1} weight={700}>
        Ventas
      </Text>
      <Text>Total de órdenes: {orders.length}</Text>
      <Text>Ingresos totales: ${totalRevenue.toFixed(2)}</Text>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {orders.map((order) => (
          <div key={order.id} style={{ display: "flex", gap: 16 }}>
            <Text>{order.id}</Text>
            <Text>{order.status}</Text>
            <Text>${(order.total || 0).toFixed(2)}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Sales;
