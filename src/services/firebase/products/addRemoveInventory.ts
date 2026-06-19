export const addRemoveInventory = async (
  orderId: string,
  action: "increment" | "decrement",
) => {
  try {
    const field = "stock";
    const value = action === "increment" ? 1 : -1;
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/addRemoveInventory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderUid: orderId, field, value }),
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating inventory: ", error);
    throw error;
  }
};
