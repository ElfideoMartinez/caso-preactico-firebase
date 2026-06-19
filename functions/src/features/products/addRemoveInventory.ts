import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const addRemoveInventory = onRequest(async (req, res) => {
  try {
    const { orderUid, field, value } = req.body;
    console.log(
      "Received request to update inventory for order:",
      orderUid,
      "Field:",
      field,
      "Value:",
      value,
    );
    if (!orderUid || !field || typeof value !== "number") {
      res.status(400).json({ error: "Missing or invalid parameters" });
      return;
    }
    const orderRef = db.collection("orders").doc(orderUid);
    const orderDoc = await orderRef.get();
    console.log("Order document data:", orderDoc.data());

    if (!orderDoc.exists) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error("Error updating inventory: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
