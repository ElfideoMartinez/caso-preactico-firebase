import { onRequest } from "firebase-functions/v2/https";
import { db } from "../../index"; // Import the initialized db from your root index file

export const addNewProduct = onRequest({ cors: true }, async (req, res) => {
  try {
    const productData = {
      name: req.body.name || "Unnamed Product",
      price: req.body.price || 0,
      createdAt: new Date(),
    };

    // Add data to the "products" collection
    const docRef = await db.collection("products").add(productData);

    res.status(200).send({
      success: true,
      message: `Product added with ID: ${docRef.id}`,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
