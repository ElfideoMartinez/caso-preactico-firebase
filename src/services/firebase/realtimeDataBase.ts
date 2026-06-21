import {
  ref,
  set,
  onValue,
  update,
  query,
  orderByChild,
} from "firebase/database";
import { rtdb } from "./firebaseApp";

export const addNewOrderRTDB = async (orderData: any) => {
  try {
    const productRef = ref(rtdb, `orders/${orderData.orderDatabaseId}`);
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

export const requestOrderCancellationRTDB = async (orderId: string) => {
  try {
    const orderRef = ref(rtdb, `orders/${orderId}`);
    await update(orderRef, { cancelRequested: true });
  } catch (error) {
    console.error("Error requesting order cancellation: ", error);
  }
};

export const getUserOrdersRTDB = (
  userId: string,
  userRole: string,
  callback: (orders: any[]) => void,
) => {
  const ordersRef = ref(rtdb, "orders");
  const orderedQuery = query(ordersRef, orderByChild("timestamp"));
  return onValue(
    orderedQuery,
    (snapshot) => {
      const orders: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const order = {
          id: childSnapshot.key,
          ...childSnapshot.val(),
        };
        if (userRole === "admin" || order.userId === userId) {
          orders.push(order);
        }
      });
      callback(orders.reverse());
    },
    (error) => {
      console.error("Error fetching user orders:", error);
    },
  );
};
