import DataTable, { type TableColumn } from "react-data-table-component";
import Text from "../typography/Text";
import Input from "../inputs/Input";
import { editProduct } from "../../services/firebase/products/EditProduct";
import { colors } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { removeFromInventory } from "../../services/firebase/products/removeFromInventory";
import {
  getStorageRef,
  uploadFile,
} from "../../services/firebase/storage/storageService";
import { useImageCache } from "../../contexts/ImageCacheContext";
import { ClipLoader } from "react-spinners";
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
  refreshProducts,
  searchTerm = "",
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  refreshProducts?: () => Promise<void>;
  searchTerm?: string;
}) => {
  const [loadingInputs, setLoadingInputs] = useState<string[]>([]);
  const { seedUrl } = useImageCache();
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
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    row: Product,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const loadingKey = `${row.id}-image`;
    try {
      setLoadingInputs((prev) => [...prev, loadingKey]);
      const fileName = file.name.replace(/\s+/g, "_");
      const newFile = new File([file], fileName, { type: file.type });
      const storageRef = getStorageRef(`/products/${newFile.name}`);
      const uploaded = await uploadFile(newFile, storageRef.fullPath);
      seedUrl(
        `${import.meta.env.VITE_FIREBASE_STORAGE_PRODUCTS_URL}${
          uploaded.metadata.fullPath
        }`,
        URL.createObjectURL(newFile),
      );
      await editProduct(row.id, "imageUrl", uploaded.metadata.fullPath);
      await refreshProducts?.();
      Swal.fire({
        title: "Imagen actualizada",
        text: `Se actualizó la imagen de "${row.name}".`,
        icon: "success",
        confirmButtonColor: colors.primary,
      });
    } catch (error) {
      console.error("Error al actualizar imagen: ", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la imagen. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: colors.danger,
      });
    } finally {
      setLoadingInputs((prev) => prev.filter((key) => key !== loadingKey));
      e.target.value = "";
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
  const iconButtonStyle = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 16,
    padding: 8,
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
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
      name: "Imagen",
      width: "90px",
      cell: (row: Product) =>
        loadingInputs.includes(`${row.id}-image`) ? (
          <ClipLoader color={colors.primary} size={20} />
        ) : (
          <label
            aria-label='Cambiar imagen'
            style={{ ...iconButtonStyle, color: colors.primary }}
          >
            <FontAwesomeIcon icon={faImage} />
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => handleImageChange(e, row)}
            />
          </label>
        ),
    },
    {
      name: "Borrar",
      width: "72px",
      cell: (row: Product) => (
        <button
          aria-label='Eliminar producto'
          onClick={() => handleDelete(row)}
          style={{ ...iconButtonStyle, color: colors.danger }}
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
  const term = searchTerm.trim().toLowerCase();
  const filteredProducts = term
    ? products.filter((product) => product.name?.toLowerCase().includes(term))
    : products;
  if (filteredProducts.length === 0) {
    return (
      <Text color={colors.textSecondary}>No se encontraron productos.</Text>
    );
  }
  return (
    <DataTable
      columns={columns}
      data={filteredProducts}
      pagination
      customStyles={customStyles}
      highlightOnHover
    />
  );
};

export default ProductsTable;
