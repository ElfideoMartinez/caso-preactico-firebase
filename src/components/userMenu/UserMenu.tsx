import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { logout } from "../../services/firebase/authServices";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import CustomModal from "../modals/CustomModal";
import Text from "../typography/Text";
import { useCart } from "../../contexts/CartContext";
import CartItem from "../cards/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

function UserMenu() {
  const { cart } = useCart();
  useEffect(() => {
    document.title = "User Menu - Innovate Solutions";
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useState("");
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={() => {
            setOpen("cart");
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 8 }} />
        </Button>
        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: colors.danger,
              color: colors.white,
              borderRadius: 999,
              minWidth: 20,
              height: 20,
              padding: "0 6px",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartCount}
          </span>
        )}
      </div>
      <button
        onClick={() => setOpen("user")}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          marginLeft: 16,
        }}
      >
        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
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
