import Card from "../cards/Card";
import OrderCard from "./OrderCard";

interface OrdersBodyProps {
  cart: any[];
}

const OrdersBody = ({ cart }: OrdersBodyProps) => {
  return (
    <Card>
      {cart.length === 0 ? (
        <p>No hay órdenes.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
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
