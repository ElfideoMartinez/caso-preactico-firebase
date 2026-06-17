interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
}
export const addNewUser = async (user: User) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addNewUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );
  const result = await response.json();

  return result.data;
};
// get users orders and products in cart
export const getUserData = async (uid: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getUserData`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    },
  );
  const result = await response.json();

  return result.data;
};
export const getAllUsers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getAllUsers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = await response.json();

  return result.data;
};
export const addToCart = async (uid: string, productId: string) => {
  try {
    console.log("Adding to cart:", { uid, productId });
    const response = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, productId }),
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error adding to cart: ${response.status} ${errorText}`);
    } else {
      const result = await response.json();
      return result.data;
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};
