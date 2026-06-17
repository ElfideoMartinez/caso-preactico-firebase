import Text from "../typography/Text";
import Card from "./Card";

const CartItem = ({ item }: { children?: React.ReactNode; item: any }) => {
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
        <Text>${item.subtotal.toFixed(2)}</Text>
      </div>
    </Card>
  );
};

export default CartItem;
