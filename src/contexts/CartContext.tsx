import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserCart, addToCart } from "../services/firebase/users";

type CartContextType = {
  cart: any[];
  refreshCart: () => Promise<void>;
  addItem: (productId: string, name: string, price: number) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  refreshCart: async () => {},
  addItem: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);

  const refreshCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }
    const data = await getUserCart(user.uid);
    setCart(data || []);
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (productId: string, name: string, price: number) => {
    if (!user) return;
    await addToCart(user.uid, productId, name, price);
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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
