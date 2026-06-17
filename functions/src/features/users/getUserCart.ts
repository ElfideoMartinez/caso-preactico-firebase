import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const getUserCart = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid || typeof uid !== "string") {
      res.status(403).json({
        success: false,
        error: "Missing or invalid uid in query parameters",
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

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export default getUserCart;
