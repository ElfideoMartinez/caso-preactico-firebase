export const addRemoveInventory = async (
  orderId: string,
  action: "increment" | "decrement",
) => {
  try {
    const field = "stock";
    const value = action === "increment" ? 1 : -1;
    const response = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addRemoveInventory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderUid: orderId, field, value }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update inventory");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating inventory: ", error);
    throw error;
  }
};
