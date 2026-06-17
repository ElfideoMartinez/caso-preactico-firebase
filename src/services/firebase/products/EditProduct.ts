type Value = string | number;
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  uid: string;
}
export const editProduct = async (
  id: string,
  field: keyof Product,
  value: Value,
) => {
  const response = await fetch(
    `http://127.0.0.1:5001/caso-practico-9de94/us-central1/editProduct`,
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
