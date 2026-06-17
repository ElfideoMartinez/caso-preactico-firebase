import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import ProductsTable, {
  type Product,
} from "../components/tables/ProductsTable";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { getProducts } from "../services/firebase/products";

const Inventory = () => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    document.title = "Inventario - Innovate Solutions";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setData(response);
    };
    fetchData();
  }, []);
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Text size={typography.h1}>Inventario</Text>
      <ProductsTable products={data} setProducts={setData} />
    </Card>
  );
};

export default Inventory;
