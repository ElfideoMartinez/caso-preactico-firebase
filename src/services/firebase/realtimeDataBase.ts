import { ref, set, onValue, update } from "firebase/database";
import { rtdb } from "./firebaseApp";

export const addNewOrderRTDB = async (orderData: any) => {
  try {
    const newName = `order_${new Date().getTime()}`;
    const productRef = ref(rtdb, `orders/${newName}`);
    await set(productRef, orderData);
  } catch (error) {
    console.error("Error adding new order: ", error);
  }
};

export const updateOrderStatusRTDB = async (
  orderId: string,
  newStatus: string,
) => {
  try {
    const orderRef = ref(rtdb, `orders/${orderId}`);
    await update(orderRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating order status: ", error);
  }
};

export const getUserOrdersRTDB = (
  userId: string,
  userRole: string,
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

      let userOrders = [];
      //if the user is admin, return all orders
      if (userRole === "admin") {
        userOrders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        callback(userOrders);
        return;
      }

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
