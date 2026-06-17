import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const editProduct = onRequest({ cors: true }, async (req, res) => {
  try {
    const { id, field, value } = req.body;
    if (!id || !field || value === undefined) {
      res
        .status(400)
        .json({ error: "Missing required fields: id, field, value" });
      return;
    }
    const productRef = db.collection("products").doc(id);
    await productRef.update({ [field]: value });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
