import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const deleteProduct = onRequest(async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid || typeof uid !== "string") {
      res.status(400).json({ message: "UID del producto es requerido" });
      return;
    }
    await db.collection("products").doc(uid).delete();
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});
