import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { logout } from "../../services/firebase/authServices";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import CustomModal from "../modals/CustomModal";
import Text from "../typography/Text";
import { useCart } from "../../contexts/CartContext";
import CartItem from "../cards/CartItem";

function UserMenu() {
  const { cart } = useCart();
  useEffect(() => {
    document.title = "User Menu - Innovate Solutions";
  }, []);
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);
  const navigate = useNavigate();
  const [open, setOpen] = useState("");

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Button
        onClick={() => {
          setOpen("cart");
        }}
      >
        🛒
      </Button>
      <button
        onClick={() => setOpen("user")}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          marginLeft: 16,
        }}
      >
        👤
      </button>

      {open === "user" && (
        <CustomModal isOpen={open === "user"} onClose={() => setOpen("")}>
          <>
            <button
              onClick={() => {
                navigate("/profile");
              }}
              style={menuStyle}
            >
              Profile
            </button>
            <button
              style={{
                ...menuStyle,
                color: colors.danger,
              }}
              onClick={async () => {
                try {
                  await logout();
                  navigate("/login");
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              Logout
            </button>
          </>
        </CustomModal>
      )}
      {open === "cart" && (
        <CustomModal
          title='Carrito de compras'
          isOpen={open === "cart"}
          onClose={() => setOpen("")}
        >
          {cart.length === 0 ? (
            <Text>No hay productos en el carrito.</Text>
          ) : (
            cart.map((item, index) => <CartItem key={index} item={item} />)
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text size={18} weight={600}>
              Total: $
              {cart
                .reduce(
                  (total, item) => total + item.sellingPrice * item.quantity,
                  0,
                )
                .toFixed(2)}
            </Text>
          </div>
          <Button
            onClick={() => {
              navigate("/checkout", { state: { cart: cart } });
              setOpen("");
            }}
          >
            Ir a checkout
          </Button>
        </CustomModal>
      )}
    </div>
  );
}

const menuStyle = {
  width: "100%",
  padding: 16,
  border: "none",
  background: "transparent",
  textAlign: "left" as const,
  cursor: "pointer",
};

export default UserMenu;
