import Card from "../cards/Card";
import Text from "../typography/Text";
import OrderCard from "./OrderCard";
import { typography } from "../../constants/typography";
import { colors } from "../../constants/colors";

interface OrdersBodyProps {
  orders: any[];
}

const OrdersBody = ({ orders }: OrdersBodyProps) => {
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
        <ul>
          {orders.map((item, index) => (
            <OrderCard key={index}>
              <Text color={colors.primary}>Id: {item.id}</Text>
              <Text color={statusColors[item.status]}>
                Status: {item.status}
              </Text>
              <Text color={colors.primary}>
                Total: ${item.total.toFixed(2)}
              </Text>
              <Text color={colors.primary}>
                Fecha: {new Date(item.timestamp).toLocaleString()}
              </Text>
              <div style={{ marginTop: 10 }}>
                <Text>Productos:</Text>
                <ul>
                  {item.cart.map((product: any, idx: number) => (
                    <li key={idx}>
                      {product.name} - ${product.price.toFixed(2)} x{" "}
                      {product.quantity}
                      {product.description && (
                        <Text size={typography.small}>
                          {product.description}
                        </Text>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </OrderCard>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default OrdersBody;
