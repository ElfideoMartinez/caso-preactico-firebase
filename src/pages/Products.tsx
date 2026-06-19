import { useEffect, useState } from "react";

import { getProducts } from "../services/firebase/products";
import ProductCard from "../components/cards/ProductCard";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";

const Products = () => {
  const [products, setProducts] = useState<Array<any>>([]);
  useEffect(() => {
    document.title = "Productos - Innovate Solutions";
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      // Aquí iría la lógica para obtener los productos desde Firebase
      const response = await getProducts();
      console.log("Productos obtenidos:", response);
      setProducts(response);
    };
    fetchProducts();
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
