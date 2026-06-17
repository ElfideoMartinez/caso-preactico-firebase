/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 1. Initialize the Admin SDK and Firestore globally first
initializeApp();
export const db = getFirestore();

// Set global options for v2 functions
setGlobalOptions({ maxInstances: 10 });

// 2. Export your functions down here so they can safely import 'db'
export { addNewProduct } from "./features/products/addNewProduct";
export { getProducts } from "./features/products/getProducts";
export { addNewUser } from "./features/users/addNewUser";
export { getUserData } from "./features/users/getUserData";
export { getAllUsers } from "./features/users/getAllUsers";
export { addToCart } from "./features/users/addToCart";
export { getUserCart } from "./features/users/getUserCart";
