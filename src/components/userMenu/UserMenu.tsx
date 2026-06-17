import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { logout } from "../../services/firebase/authServices";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import CustomModal from "../modals/CustomModal";
import Text from "../typography/Text";
import { getUserCart } from "../../services/firebase/users";
import { useAuth } from "../../contexts/AuthContext";

function UserMenu() {
  const { user } = useAuth();
  const [userCart, setUserCart] = useState<Array<any>>([]);
  useEffect(() => {
    document.title = "User Menu - Innovate Solutions";
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserCart(user.uid);
          console.log("User data:", data);
          setUserCart(data?.products || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);
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
            <button style={menuStyle}>Profile</button>

            <button style={menuStyle}>Settings</button>

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
          {userCart.length === 0 ? (
            <Text>No hay productos en el carrito.</Text>
          ) : (
            userCart.map((item, index) => <Text key={index}>{item}</Text>)
          )}
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
