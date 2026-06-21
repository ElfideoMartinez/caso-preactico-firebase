import DataTable, { type TableColumn } from "react-data-table-component";
import Text from "../typography/Text";
import Input from "../inputs/Input";
import { editProduct } from "../../services/firebase/products/EditProduct";
import { colors } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { removeFromInventory } from "../../services/firebase/products/removeFromInventory";
import { useState } from "react";

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
  const [loadingInputs, setLoadingInputs] = useState<string[]>([]);
  const handleInputChangeFunction = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: Product,
    fieldName: keyof Product,
    setData: React.Dispatch<React.SetStateAction<Product[]>>,
  ) => {
    const newValue = e.currentTarget.value;
    const updatedRow = { ...row, [fieldName]: newValue };
    setData((prevData) =>
      prevData.map((item) => (item.id === row.id ? updatedRow : item)),
    );
  };
  const handleUpdate = async (
    id: string,
    field: keyof Product,
    value: string | number,
  ) => {
    const loadingKey = `${id}-${field}`;
    try {
      setLoadingInputs((prev) => [...prev, loadingKey]);
      await editProduct(id, field, value);
    } catch (error) {
      console.error("Error al editar producto: ", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo editar el producto. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: colors.danger,
      });
    } finally {
      setLoadingInputs((prev) => prev.filter((key) => key !== loadingKey));
    }
  };
  const handleDelete = async (row: Product) => {
    try {
      await removeFromInventory(row.uid);
      Swal.fire({
        title: "¿Eliminar producto?",
        text: `Se eliminará "${row.name}".`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: colors.danger,
        cancelButtonColor: colors.textSecondary,
      });
      setProducts((prev) => prev.filter((product) => product.id !== row.id));
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el producto. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: colors.danger,
      });
    }
  };
  const columns: TableColumn<Product>[] = [
    {
      name: "Nombre",
      selector: (row: Product) => (
        <Input
          isLoading={loadingInputs.includes(`${row.id}-name`)}
          type='text'
          value={row.name}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdate(row.id, "name", row.name);
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
          isLoading={loadingInputs.includes(`${row.id}-price`)}
          type='text'
          value={row.price}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdate(row.id, "price", Number(row.price));
            }
          }}
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
          isLoading={loadingInputs.includes(`${row.id}-stock`)}
          type='text'
          value={row.stock}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdate(row.id, "stock", Number(row.stock));
            }
          }}
          onChange={(e) => {
            handleInputChangeFunction(e, row, "stock", setProducts);
          }}
        />
      ),
    },
    {
      name: "",
      width: "72px",
      cell: (row: Product) => (
        <button
          aria-label='Eliminar producto'
          onClick={() => handleDelete(row)}
          style={{
            border: "none",
            background: "transparent",
            color: colors.danger,
            cursor: "pointer",
            fontSize: 16,
            padding: 8,
            borderRadius: 8,
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        background: colors.surfaceHover,
        borderBottomColor: colors.border,
      },
    },
    headCells: {
      style: {
        color: colors.text,
        fontWeight: 700,
        fontSize: 14,
      },
    },
    rows: {
      style: {
        minHeight: 64,
        color: colors.text,
      },
    },
    pagination: {
      style: {
        backgroundColor: colors.backgroundColor,
        borderTopColor: colors.border,
      },
    },
  };
  if (products.length === 0) {
    return (
      <Text color={colors.textSecondary}>No hay productos disponibles.</Text>
    );
  }
  return (
    <DataTable
      columns={columns}
      data={products}
      pagination
      customStyles={customStyles}
      highlightOnHover
    />
  );
};

export default ProductsTable;
