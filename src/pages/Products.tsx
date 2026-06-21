import { useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";
import { colors } from "../constants/colors";
import { useProducts } from "../contexts/ProductsContext";
import Loader from "../components/loaders/Loader";

const Products = () => {
  const { products, loading } = useProducts();
  useEffect(() => {
    document.title = "Productos - Comercializadora Nova";
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}
      >
        <Text size={typography.h1} weight={700}>
          Productos
        </Text>
        <Text color={colors.textSecondary}>
          {products.length} {products.length === 1 ? "producto" : "productos"}
        </Text>
      </div>
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: spacing.md,
          }}
        >
          {products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              salePrice={product.salePrice}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      ) : (
        <Text color={colors.textSecondary}>No hay productos disponibles.</Text>
      )}
    </div>
  );
};

export default Products;
