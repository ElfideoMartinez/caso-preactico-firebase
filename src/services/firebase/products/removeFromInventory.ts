export const removeFromInventory = async (uid: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}removeFromInventory`,
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
  } catch (error) {
    console.error("Error al eliminar producto del inventario: ", error);
  }
};
