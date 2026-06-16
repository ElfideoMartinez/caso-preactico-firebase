import { onRequest } from "firebase-functions/https";
import { db } from "../..";

export const addNewUser = onRequest({ cors: true }, async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      displayName: req.body.displayName || null,
      photoURL: req.body.photoURL || null,
      createdAt: new Date(),
      orders: [],
      cart: [],
      uid: req.body.uid,
    };
    //check users collection for existing user with the same email
    const existingUserQuery = await db
      .collection("users")
      .where("email", "==", userData.email)
      .get();

    if (!existingUserQuery.empty) {
      res.status(400).send({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }
    // Add user data to the "users" collection
    await db.collection("users").doc(userData.uid).set(userData);

    res.status(200).send({
      success: true,
      message: `User added with ID: ${userData.uid}`,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
