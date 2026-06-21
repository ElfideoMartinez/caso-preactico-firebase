import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import ProductsTable from "../components/tables/ProductsTable";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import Button from "../components/buttons/Button";
import AddNewProductModal from "../components/modals/AddNewProductModal";
import { useProducts } from "../contexts/ProductsContext";
import Loader from "../components/loaders/Loader";
import Search from "../components/inputs/search";

const Inventory = () => {
  const { products, loading, refreshProducts, setProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    document.title = "Inventario - Comercializadora Nova";
  }, []);
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
          refreshData={refreshProducts}
        />
        <Text size={typography.h1} weight={700}>
          Inventario
        </Text>
        <Button onClick={() => setIsModalOpen(true)}>Agregar Producto</Button>
      </div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder='Buscar producto...'
      />
      {loading ? (
        <Loader />
      ) : (
        <ProductsTable
          products={products}
          setProducts={setProducts}
          refreshProducts={refreshProducts}
          searchTerm={searchTerm}
        />
      )}
    </Card>
  );
};

export default Inventory;
