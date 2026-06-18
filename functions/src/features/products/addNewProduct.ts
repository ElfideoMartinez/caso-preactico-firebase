import { onRequest } from "firebase-functions/v2/https";
import { db } from "../../index"; // Import the initialized db from your root index file

export const addNewProduct = onRequest({ cors: true }, async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      stock === undefined ||
      !imageUrl
    ) {
      res.status(400).send({
        success: false,
        message:
          "Missing required fields: name, description, price, stock, imageUrl",
      });
    }

    console.log("Received product data:", {
      name,
      description,
      price,
      stock,
      imageUrl,
    });
    const docRef = await db.collection("products").add({
      name,
      description,
      price,
      stock,
      imageUrl,
      createdAt: new Date(),
    });

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
