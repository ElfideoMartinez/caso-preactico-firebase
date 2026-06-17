import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const placeNewOrder = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid, total, cart } = req.body;
    console.log("Received order data:", { uid, total, cart });

    if (!uid || !total || !cart) {
      res
        .status(400)
        .json({ error: "Missing required fields: uid, total, cart" });
      return;
    }
    const newOrder = {
      uid,
      total,
      cart,
      createdAt: new Date(),
      status: "pending",
    };
    const orderRef = await db.collection("orders").add(newOrder);
    //add order ID to user's orders and clear cart
    const userRef = await db.collection("users").doc(uid).get();
    if (!userRef.exists) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const userData = userRef.data();
    const userOrders = userData?.orders || [];
    await db
      .collection("users")
      .doc(uid)
      .update({
        orders: [...userOrders, orderRef.id],
        cart: [],
      });
    console.log("Order placed with ID:", orderRef.id);
    res
      .status(200)
      .json({ message: "Order placed successfully", orderId: orderRef.id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order" });
  }
});
