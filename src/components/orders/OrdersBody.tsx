import Card from "../cards/Card";
import OrderCard from "./OrderCard";

interface OrdersBodyProps {
  orders: any[];
}

const OrdersBody = ({ orders }: OrdersBodyProps) => {
  return (
    <Card>
      {orders.length === 0 ? (
        <p>No hay órdenes.</p>
      ) : (
        <ul>
          {orders.map((item, index) => (
            <OrderCard key={index}>
              <p>Producto: {item.productName}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price}</p>
            </OrderCard>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default OrdersBody;
