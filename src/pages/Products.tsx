import { useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { useProducts } from "../contexts/ProductsContext";

const Products = () => {
  const { products } = useProducts();
  useEffect(() => {
    document.title = "Productos - Comercializadora Nova";
  }, []);
  return (
    <>
      <Text size={typography.h1} weight={700}>
        Productos
      </Text>
      {products.length > 0 ? (
        <div
          style={{
            gap: 16,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 3fr))",
              gap: 16,
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
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </>
  );
};

export default Products;
