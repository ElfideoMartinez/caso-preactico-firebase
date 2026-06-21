type Value = string | number;
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  uid: string;
  imageUrl?: string;
}
export const editProduct = async (
  id: string,
  field: keyof Product,
  value: Value,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}editProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, value }),
    },
  );
  const result = await response.json();
  return result;
};
