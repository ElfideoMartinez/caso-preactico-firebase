import { useNavigate } from "react-router-dom";
import Card from "../components/cards/Card";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";
import CartItem from "../components/cards/CartItem";
import Button from "../components/buttons/Button";
import { addNewOrder } from "../services/firebase/users";
import { useAuth } from "../contexts/AuthContext";
import { addNewOrderRTDB } from "../services/firebase/realtimeDataBase";
import Swal from "sweetalert2";
import { useCart } from "../contexts/CartContext";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0,
  );
  const handleCheckout = async () => {
    try {
      console.log(
        "Processing checkout with cart data:",
        cart,
        "and total:",
        total,
      );
      if (!user || !user.uid) {
        Swal.fire({
          icon: "error",
          title: "User not authenticated",
          text: "Please log in to complete your order.",
        });
        return;
      }
      await addNewOrder(user.uid, total, cart);
      await addNewOrderRTDB({
        cart,
        total: total,
        timestamp: new Date().toISOString(),
        status: "pending",
        userId: user.uid,
      });
      Swal.fire({
        icon: "success",
        title: "¡Orden realizada con éxito!",
        text: "Tu orden ha sido procesada correctamente.",
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al procesar tu orden. Por favor, intenta nuevamente.",
      });
    } finally {
      navigate("/pedidos");
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
              {`Total: $${total.toFixed(2)}`}
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
