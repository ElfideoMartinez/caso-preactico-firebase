import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const addToCart = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid, productId, quantity = 1, name, sellingPrice } = req.body;
    console.log("Received addToCart request with:", {
      uid,
      productId,
      quantity,
      name,
      sellingPrice,
    });

    if (!uid || !productId) {
      res.status(400).json({
        success: false,
        error: "Missing uid or productId",
      });
      return;
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    const userData = userDoc.data();
    const cart = userData?.cart || [];

    const existingIndex = cart.findIndex((item: any) => item.id === productId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity,
        name,
        sellingPrice,
      });
    }

    await userRef.update({
      cart,
    });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
