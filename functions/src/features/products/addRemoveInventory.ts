import { onRequest } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../..";

export const addRemoveInventory = onRequest(async (req, res) => {
  try {
    const { orderUid, field, value } = req.body;
    if (!orderUid || !field || typeof value !== "number") {
      res.status(400).json({ error: "Missing or invalid parameters" });
      return;
    }
    const orderRef = db.collection("orders").doc(orderUid);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    const orderData = orderDoc.data();
    if (!orderData || !orderData.cart) {
      res.status(400).json({ error: "Invalid order data" });
      return;
    }
    const cart = orderData.cart;
    const batch = db.batch();
    for (const item of cart) {
      const productRef = db.collection("products").doc(item.id);
      const productDoc = await productRef.get();
      if (!productDoc.exists) {
        console.warn(
          `Product with ID ${item.id} not found, skipping inventory update.`,
        );
        continue;
      }
      const productData = productDoc.data();
      if (!productData || typeof productData.stock !== "number") {
        console.warn(
          `Invalid product data for ${item.id}, skipping inventory update.`,
        );
        continue;
      }
      const quantity = typeof item.quantity === "number" ? item.quantity : 0;
      batch.update(productRef, {
        [field]: FieldValue.increment(value * quantity),
      });
    }
    await batch.commit();
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error("Error updating inventory: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
