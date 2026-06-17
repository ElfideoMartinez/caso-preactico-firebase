export const addNewProduct = async (product: {
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addNewProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    },
  );
  const result = await response.json();

  return result.data;
};
export const getProducts = async () => {
  console.log("Fetching products from backend...", {
    url: `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getProducts`,
  });
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getProducts`,
  );
  const result = await response.json();
  return result;
};
