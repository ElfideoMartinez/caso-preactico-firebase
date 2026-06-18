export const addNewProduct = async (product: {
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
  imageUrl: string;
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
  const storageUrl = import.meta.env.VITE_FIREBASE_STORAGE_PRODUCTS_URL;
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}getProducts`,
  );
  const result = await response.json();
  const formattedProducts = result.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    salePrice: product.salePrice,
    imageUrl: product.imageUrl ? `${storageUrl}${product.imageUrl}` : null,
  }));
  console.log("Products fetched and formatted:", formattedProducts);
  return formattedProducts;
};
