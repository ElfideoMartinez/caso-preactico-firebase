import Text from "../typography/Text";
import Card from "./Card";

const CartItem = ({ item }: { children?: React.ReactNode; item: any }) => {
  const { quantity, sellingPrice } = item || {};
  const subTotal = sellingPrice * quantity;
  if (!item) return <Text>Producto no encontrado</Text>;
  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      <Text>
        {item.name} x {item.quantity}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text>${subTotal.toFixed(2)}</Text>
      </div>
    </Card>
  );
};

export default CartItem;
