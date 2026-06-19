import { useState } from "react";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useCart } from "../../contexts/CartContext";
import Button from "../buttons/Button";
import Card from "../cards/Card";
import Input from "../inputs/Input";
import Text from "../typography/Text";
import { useAuth } from "../../contexts/AuthContext";
import FileInput from "../inputs/FileInput";

const EditProfileForm = () => {
  const { userData } = useCart();
  const { photoURL } = useAuth().user || {};
  const { displayName, email } = userData || {};
  console.log("User data in EditProfileForm:", userData);
  const [formData, setFormData] = useState({
    displayName: displayName || "",
    email: email || "",
    photoURL: photoURL || "",
  });
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
            src={formData.photoURL}
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
                console.log("Selected file:", file);
                reader.readAsDataURL(file);
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
          <Button>Save Changes</Button>
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
