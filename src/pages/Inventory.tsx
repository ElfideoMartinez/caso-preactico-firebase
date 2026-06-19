import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import ProductsTable, {
  type Product,
} from "../components/tables/ProductsTable";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { getProducts } from "../services/firebase/products";
import Button from "../components/buttons/Button";
import AddNewProductModal from "../components/modals/AddNewProductModal";

const Inventory = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    document.title = "Inventario - Innovate Solutions";
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await getProducts();
    setData(response);
  };
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AddNewProductModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refreshData={fetchData}
        />
        <Text size={typography.h1} weight={700}>
          Inventario
        </Text>
        <Button onClick={() => setIsModalOpen(true)}>Agregar Producto</Button>
      </div>
      <ProductsTable products={data} setProducts={setData} />
    </Card>
  );
};

export default Inventory;
