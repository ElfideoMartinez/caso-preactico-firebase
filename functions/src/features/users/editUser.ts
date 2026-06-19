import { onRequest } from "firebase-functions/v2/https";
import { db } from "../..";

export const editUser = onRequest({ cors: true }, async (req, res) => {
  try {
    const { uid, displayName, email, newPhotoFile, role } = req.body;
    if (!uid) {
      res.status(400).send({ error: "User ID (uid) is required." });
      return;
    }
    const userRef = db.collection("users").doc(uid);
    const updateData: {
      displayName?: string;
      email?: string;
      photoURL?: string;
      role?: string;
    } = {};
    if (displayName) updateData.displayName = displayName;
    if (email) updateData.email = email;
    if (newPhotoFile) updateData.photoURL = newPhotoFile;
    if (role) updateData.role = role;

    await userRef.update(updateData);
    res.status(200).send({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while editing the user.",
      details: error,
    });
  }
});
