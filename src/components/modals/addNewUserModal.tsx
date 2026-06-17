import Modal from "react-modal";
import Text from "../typography/Text";
import { typography } from "../../constants/typography";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Button from "../buttons/Button";
import { register, resetPassword } from "../../services/firebase/authServices";
import { useState } from "react";
import { addNewUser } from "../../services/firebase/users";

interface AddNewUserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
const generateRandomPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const AddNewUserModal = ({ isOpen, onRequestClose }: AddNewUserModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const handleAddNewUser = async () => {
    try {
      const newPassword = generateRandomPassword();
      setIsLoading(true);
      const { user } = await register(formData.email, newPassword);
      await addNewUser({
        uid: user.uid,
        displayName: formData.name,
        email: formData.email,
        role: formData.role,
        photoURL: user.photoURL,
      });
      if (formData.email) {
        await resetPassword(formData.email);
      }
    } catch (error) {
      console.error("Error al agregar nuevo usuario:", error);
    } finally {
      console.log("Proceso de agregar nuevo usuario finalizado");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          inset: "20% 30%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Text size={typography.h1}>Agregar nuevo usuario</Text>
      <Input
        type='text'
        placeholder='Nombre completo'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type='email'
        placeholder='Correo electrónico'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Select
        options={[
          { value: "admin", label: "Administrador" },
          { value: "user", label: "Usuario" },
        ]}
        onChange={(value) => setFormData({ ...formData, role: value })}
      />
      <Button disabled={isLoading} onClick={handleAddNewUser}>
        <Text>{isLoading ? "Cargando..." : "Agregar usuario"}</Text>
      </Button>
    </Modal>
  );
};

export default AddNewUserModal;
