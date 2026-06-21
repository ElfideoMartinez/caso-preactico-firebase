import { onRequest } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth";
import { db } from "../..";

const generateRandomPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const createUser = onRequest({ cors: true }, async (req, res) => {
  try {
    const { email, displayName, role } = req.body;
    if (!email) {
      res
        .status(400)
        .json({ success: false, error: "Missing required field: email" });
      return;
    }
    const existingUserQuery = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!existingUserQuery.empty) {
      res
        .status(400)
        .json({ success: false, message: "User with this email already exists" });
      return;
    }
    const userRecord = await getAuth().createUser({
      email,
      password: generateRandomPassword(),
      displayName: displayName || undefined,
    });
    const userData = {
      email,
      displayName: displayName || null,
      photoURL: userRecord.photoURL || null,
      createdAt: new Date(),
      orders: [],
      cart: [],
      uid: userRecord.uid,
      role: role || "user",
      signInMethod: "email",
    };
    await db.collection("users").doc(userRecord.uid).set(userData);
    res.status(200).json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
