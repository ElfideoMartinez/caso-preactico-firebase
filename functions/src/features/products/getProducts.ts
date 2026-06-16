import { onRequest } from "firebase-functions/v2/https";
import { db } from "../../index"; // Import the initialized db from your root index file

export const getProducts = onRequest(
  { cors: true },
  async (req: any, res: any) => {
    try {
      const docRef = await db.collection("products").get();

      const items = docRef.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json(items);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
);
