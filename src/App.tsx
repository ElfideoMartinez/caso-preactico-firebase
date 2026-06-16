import { useEffect, useState } from "react";
import Button from "./components/buttons/Button";
import Card from "./components/cards/Card";
import Text from "./components/typography/Text";
import { getProducts, addNewProduct } from "./services/firebase/products";
import LoginPage from "./features/auth/pages/LoginPage";

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
  return <LoginPage />;
}

export default App;
