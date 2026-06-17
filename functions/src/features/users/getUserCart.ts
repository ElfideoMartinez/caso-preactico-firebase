import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const getUserCart = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid } = req.query;
    console.log("Received getUserCart request with uid:", uid);

    if (!uid || typeof uid !== "string") {
      res.status(400).json({
        success: false,
        error: "Missing uid",
      });
      return;
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    console.log("User document data:", userDoc.data(), userDoc.exists);

    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    const cart = userDoc.data()?.cart || [];

    if (cart.length === 0) {
      res.status(200).json({
        success: true,
        data: [],
      });
      return;
    }

    const enrichedCart = await Promise.all(
      cart.map(async (cartItem: any) => {
        const productRef = db.collection("products").doc(cartItem.id);
        const productDoc = await productRef.get();

        if (!productDoc.exists) {
          console.warn(`Product with ID ${cartItem.id} not found`);
          return null;
        }

        const product = productDoc.data() as any;
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity: cartItem.quantity,
          subtotal: product.price * cartItem.quantity,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: enrichedCart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
