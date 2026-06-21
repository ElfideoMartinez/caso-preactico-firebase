import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addToCart, getUserData } from "../services/firebase/users";

type CartContextType = {
  cart: any[];
  userData: any;
  refreshCart: () => Promise<void>;
  addItem: (
    productId: string,
    name: string,
    price: number,
    quantity: number,
  ) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  userData: null,
  refreshCart: async () => {},
  addItem: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const refreshCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }
    const data = await getUserData(user.uid);
    setUserData(data);
    setCart(data?.cart || []);
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (
    productId: string,
    name: string,
    price: number,
    quantity: number,
  ) => {
    if (!user) return;
    await addToCart(user.uid, productId, name, price, quantity);
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        userData,
        refreshCart,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
