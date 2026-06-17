import { useLocation } from "react-router-dom";
import Card from "../components/cards/Card";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";
import CartItem from "../components/cards/CartItem";
import Button from "../components/buttons/Button";
import { addNewOrder } from "../services/firebase/users";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { cart } = location.state || {};
  const userTotal =
    cart?.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0,
    ) || 0;
  const handleCheckout = async () => {
    try {
      console.log(
        "Processing checkout with cart data:",
        cart,
        "and total:",
        userTotal,
      );
      await addNewOrder(user?.uid, userTotal, cart);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(
        "Hubo un error al procesar tu orden. Por favor, intenta nuevamente.",
      );
    } finally {
    }
  };
  return (
    <Card
      style={{
        display: "grid",
        gridTemplateColumns: "1fr max-content",
        gap: spacing.xl,
        alignItems: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.lg,
        }}
      >
        <Text size={typography.h1}>Tu Orden</Text>
        {cart && cart.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: spacing.md,
            }}
          >
            {cart.map((item: any, index: number) => (
              <CartItem key={index} item={item} />
            ))}
            <Text style={{ alignSelf: "self-end" }} size={typography.h2}>
              Total: ${userTotal.toFixed(2)}
            </Text>
            <Button onClick={handleCheckout}>Realizar Orden</Button>
          </div>
        ) : (
          <Text>No tienes productos en tu carrito.</Text>
        )}
      </div>
    </Card>
  );
};

export default Checkout;
