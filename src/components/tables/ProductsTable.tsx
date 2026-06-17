import { useEffect } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import Text from "../typography/Text";
import Input from "../inputs/Input";
import { editProduct } from "../../services/firebase/products/EditProduct";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  uid: string;
}

const ProductsTable = ({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const handleInputChangeFunction = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: Product,
    fieldName: keyof Product,
    setData: React.Dispatch<React.SetStateAction<Product[]>>,
  ) => {
    const newValue = e.currentTarget.value;
    //return the new object with the updated value
    const updatedRow = { ...row, [fieldName]: newValue };
    setData((prevData) =>
      prevData.map((item) => (item.id === row.id ? updatedRow : item)),
    );
  };
  const columns: TableColumn<Product>[] = [
    {
      name: "Nombre",
      selector: (row: Product) => (
        <Input
          type='text'
          value={row.name}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              editProduct(row.id, "name", row.name);
            }
          }}
          onChange={(e) => {
            handleInputChangeFunction(e, row, "name", setProducts);
          }}
        />
      ),
      sortable: true,
    },
    {
      name: "Precio unitario",
      selector: (row: Product) => (
        <Input
          type='text'
          value={row.price}
          onChange={(e) => {
            handleInputChangeFunction(e, row, "price", setProducts);
          }}
        />
      ),
      sortable: true,
    },
    {
      name: "Cantidad en stock",
      selector: (row: Product) => (
        <Input
          type='text'
          value={row.stock}
          onKeyDown={(e) => {
            console.log("Key down detected:", e.key);
            if (e.key === "Enter") {
              console.log("Enter key pressed, saving changes...");
              e.preventDefault();
              return;
            }
          }}
          onChange={(e) => {
            handleInputChangeFunction(e, row, "stock", setProducts);
          }}
        />
      ),
    },
  ];
  useEffect(() => {
    setProducts(products);
  }, [products]);
  if (products.length === 0) {
    return <Text>No hay productos disponibles.</Text>;
  }
  return <DataTable columns={columns} data={products} pagination />;
};

export default ProductsTable;
