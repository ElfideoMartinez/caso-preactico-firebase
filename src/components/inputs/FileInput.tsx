import { useState } from "react";
import { colors } from "../../constants/colors";
import { useCart } from "../../contexts/CartContext";
import Button from "../buttons/Button";
import Text from "../typography/Text";
const FileInput = ({ setFile }: { setFile: (file: File) => void }) => {
  const { userData } = useCart();
  const [isGoogleUser] = useState(userData?.signInMethod === "google");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  if (isGoogleUser) {
    return (
      <Button disabled variant='lightButtonVariant'>
        <Text color={colors.textSecondary}>
          Para cambiar tu foto de perfil, por favor actualiza tu foto en tu
          cuenta de Google.
        </Text>
      </Button>
    );
  }

  return (
    <Button variant='lightButtonVariant'>
      <label htmlFor='file-upload' style={{ cursor: "pointer" }}>
        <Text color={colors.textSecondary}>
          {isGoogleUser
            ? "Para cambiar tu foto de perfil, por favor actualiza tu foto en tu cuenta de Google."
            : "Cambiar foto de perfil"}
        </Text>
      </label>
      <input
        id='file-upload'
        type='file'
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Button>
  );
};

export default FileInput;
