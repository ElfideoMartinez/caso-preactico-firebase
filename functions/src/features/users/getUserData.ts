import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const getUserData = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      res.status(400).send({ error: "UID is required" });
      return;
    }

    // Fetch user data from your database or Firebase
    const colRef = db.collection("users");
    const userDoc = await colRef.where("uid", "==", uid).get();
    if (userDoc.empty) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    const userData = userDoc.docs[0].data();
    res.status(200).send({ data: userData });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});
