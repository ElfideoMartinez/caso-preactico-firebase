import Modal from "react-modal";
import Card from "../cards/Card";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import Text from "../typography/Text";
import { typography } from "../../constants/typography";
import { useState } from "react";
import { addNewProduct } from "../../services/firebase/products";
import {
  getStorageRef,
  uploadFile,
} from "../../services/firebase/storage/storageService";

interface AddNewProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refreshData: () => Promise<void>;
}

const AddNewProductModal = ({
  isOpen,
  setIsOpen,
  refreshData,
}: AddNewProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addNewProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl,
      });
      await refreshData();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <Modal
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          maxHeight: "max-content",
          maxWidth: "max-content",
          margin: "auto",
          borderRadius: "12px",
          padding: "24px",
          gap: "16px",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Text size={typography.h1}>Agregar nuevo producto</Text>
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input
            type='text'
            placeholder='Nombre del producto'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Descripción del producto'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            type='number'
            placeholder='Precio del producto'
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <Input
            type='number'
            placeholder='Cantidad del producto'
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
          <input
            type='file'
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const storageRef = getStorageRef(`products/${file.name}`);
                await uploadFile(file, storageRef.fullPath);
                console.log(
                  "Archivo subido a Firebase Storage:",
                  storageRef.fullPath,
                );
                setFormData({ ...formData, imageUrl: storageRef.fullPath });
              }
            }}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Agregando..." : "Agregar producto"}
          </Button>
        </Card>
      </div>
    </Modal>
  );
};

export default AddNewProductModal;
