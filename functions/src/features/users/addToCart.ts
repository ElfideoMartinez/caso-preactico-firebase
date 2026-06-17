import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const addToCart = onRequest({ cors: true }, async (req, res) => {
  try {
    //we get user and product id from the request body
    const { uid, productId } = req.body;

    if (!uid || !productId) {
      res.status(403).json({
        success: false,
        error: "Missing uid or productId in request body",
      });
      return;
    }
    //new cart = old cart + new product id
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
    const currentCart = userData?.cart || [];
    const updatedCart = [...currentCart, productId];

    await userRef.update({ cart: updatedCart });

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
