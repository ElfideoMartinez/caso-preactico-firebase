import Modal from "react-modal";
import Text from "../typography/Text";
import { typography } from "../../constants/typography";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Button from "../buttons/Button";
import { register, resetPassword } from "../../services/firebase/authServices";
import { useState } from "react";
import { addNewUser } from "../../services/firebase/users";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import Swal from "sweetalert2";

interface AddNewUserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onUserAdded?: () => void | Promise<void>;
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

const AddNewUserModal = ({
  isOpen,
  onRequestClose,
  onUserAdded,
}: AddNewUserModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const isValid = Boolean(
    formData.name.trim() && formData.email.trim() && formData.role,
  );
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
      await onUserAdded?.();
      setFormData({ name: "", email: "", role: "" });
      onRequestClose();
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        text: "Se envió un correo para establecer la contraseña.",
        confirmButtonColor: colors.primary,
      });
    } catch (error) {
      console.error("Error al agregar nuevo usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el usuario. Inténtalo de nuevo.",
        confirmButtonColor: colors.danger,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          inset: "auto",
          position: "relative",
          maxWidth: 440,
          width: "90%",
          maxHeight: "max-content",
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
          boxShadow: `0 10px 30px ${colors.shadow}`,
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}
      >
        <Text size={typography.h2} weight={700}>
          Agregar nuevo usuario
        </Text>
        <Text size={typography.small} color={colors.textSecondary}>
          Se enviará un correo para que el usuario establezca su contraseña.
        </Text>
      </div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: spacing.sm,
          marginTop: spacing.sm,
        }}
      >
        <Button
          variant='lightButtonVariant'
          disabled={isLoading}
          onClick={onRequestClose}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading || !isValid} onClick={handleAddNewUser}>
          {isLoading ? "Cargando..." : "Agregar usuario"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddNewUserModal;
