import { ref, set, onValue } from "firebase/database";
import { rtdb } from "./firebaseApp";

export const addNewOrderRTDB = async (orderData: any) => {
  try {
    //create name by date and time
    const newName = `order_${new Date().getTime()}`;
    const productRef = ref(rtdb, `orders/${newName}`);
    await set(productRef, orderData);
  } catch (error) {
    console.error("Error adding new order: ", error);
  }
};

export const getUserOrdersRTDB = (
  userId: string,
  callback: (orders: any[]) => void,
) => {
  const ordersRef = ref(rtdb, "orders");

  const unsubscribe = onValue(
    ordersRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        callback([]);
        return;
      }

      const userOrders = [];

      for (const key in data) {
        if (data[key].userId === userId) {
          userOrders.push({
            id: key,
            ...data[key],
          });
        }
      }

      callback(userOrders);
    },
    (error) => {
      console.error("Error fetching user orders:", error);
    },
  );

  return unsubscribe;
};
