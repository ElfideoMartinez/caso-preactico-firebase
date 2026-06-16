import { useEffect, useState } from "react";
import Button from "./components/buttons/Button";
import Card from "./components/cards/Card";
import Text from "./components/typography/Text";
import { getProducts, addNewProduct } from "./services/firebase/products";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("Getting items...");
    //call getProducts to test the function
    const getItems = async () => {
      const items = await getProducts();
      console.log("Items fetched:", items);
      setProducts(items);
    };

    getItems();
  }, []);
  return (
    <Card>
      <h1>Proyecto listo</h1>
      <Text>
        Este es un proyecto de React con TypeScript, listo para ser utilizado
        como base para tus aplicaciones.
      </Text>
      {products.length > 0 && (
        <div>
          <h2>Productos:</h2>
          <ul>
            {products.map((product: any) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={() => alert("¡Botón clickeado!")}>Haz clic aquí</Button>
      <Button
        onClick={async () => {
          const newItem = await addNewProduct("Nuevo ítem");
          console.log(newItem);
        }}
      >
        Agregar ítem
      </Button>
    </Card>
  );
}

export default App;
