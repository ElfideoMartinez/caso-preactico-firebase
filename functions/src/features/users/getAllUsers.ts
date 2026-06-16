import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const getAllUsers = onRequest({ cors: true }, async (req, res) => {
  try {
    const colRef = db.collection("users");
    const snapshot = await colRef.get();
    const users = snapshot.docs.map((doc) => doc.data());

    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});
