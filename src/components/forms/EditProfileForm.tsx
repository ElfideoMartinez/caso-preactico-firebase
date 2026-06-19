import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useCart } from "../../contexts/CartContext";
import Button from "../buttons/Button";
import Card from "../cards/Card";
import Input from "../inputs/Input";
import Text from "../typography/Text";
import { useAuth } from "../../contexts/AuthContext";
import FileInput from "../inputs/FileInput";
import Swal from "sweetalert2";
import {
  getStorageRef,
  uploadFile,
} from "../../services/firebase/storage/storageService";
import { updateProfile } from "../../services/firebase/users/updateProfile";
import { getDownloadURL } from "firebase/storage";

const EditProfileForm = () => {
  const { userData } = useCart();
  const { user } = useAuth();
  const { displayName, email } = userData || {};
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    displayName: displayName || "",
    email: email || "",
    photoURL: userData?.photoURL || user?.photoURL || "",
  });
  const handleSaveChanges = async () => {
    let uploadResult;
    if (file) {
      const formatedFileName = `${userData?.uid}_${file.name}`;
      const storagePath = `profile_pictures/${formatedFileName}`;
      uploadResult = await uploadFile(file, storagePath);
    }
    await updateProfile({
      uid: userData?.uid || "",
      displayName: formData.displayName,
      email: formData.email,
      newPhotoFile: uploadResult?.metadata.fullPath || undefined,
    });
    Swal.fire({
      title: "Cambios guardados",
      text: "Tu perfil ha sido actualizado exitosamente.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  useEffect(() => {
    document.title = "Edit Profile - Innovate Solutions";
    const fetchUserPhotoURL = async () => {
      if (userData?.photoURL) {
        const storageRef = getStorageRef(userData.photoURL);
        const url = await getDownloadURL(storageRef);
        setFormData((prev) => ({
          ...prev,
          photoURL: url,
        }));
        return;
      }
    };
    fetchUserPhotoURL();
  }, [userData]);
  if (!userData) {
    return <Text>Loading...</Text>;
  }
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.xl,
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.lg,
          }}
        >
          <img
            src={formData.photoURL || "/default-profile.png"}
            alt='Profile'
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${colors.primaryLight}`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
            }}
          >
            <Text size={28} weight={700}>
              Perfil de Usuario
            </Text>
            <FileInput
              setFile={(file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData((prev) => ({
                    ...prev,
                    photoURL: reader.result as string,
                  }));
                };
                reader.readAsDataURL(file);
                setFile(file);
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.lg,
          }}
        >
          <div>
            <Text weight={600} color={colors.textSecondary}>
              Nombre('s)
            </Text>
            <Input
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
          </div>
          <div>
            <Text weight={600} color={colors.textSecondary}>
              Email Address
            </Text>
            <Input value={formData.email} disabled />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: spacing.xl,
            display: "flex",
            flexDirection: "column",
            gap: spacing.md,
          }}
        >
          <Button variant='warningLightButton'>
            <Text color={colors.warning}>
              Click aqui para cambiar recibir un email con el link para cambiar
              tu contraseña
            </Text>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditProfileForm;
