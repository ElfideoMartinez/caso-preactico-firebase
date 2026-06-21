export const addNewOrder = async (
  uid: string | undefined,
  total: number,
  cart: any[],
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}placeNewOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, total, cart }),
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding new order:", error);
    throw error;
  }
};
