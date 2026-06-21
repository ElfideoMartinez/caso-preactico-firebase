export const getAllOrders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getAllOrders`,
  );
  const result = await response.json();
  return result;
};
