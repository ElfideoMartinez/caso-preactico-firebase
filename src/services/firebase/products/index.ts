export const addNewProduct = async (name: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addNewProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    },
  );
  const result = await response.json();

  return result.data;
};
export const getProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getProducts`,
  );
  const result = await response.json();
  return result;
};
