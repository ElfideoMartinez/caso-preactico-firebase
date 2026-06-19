import { colors } from "../../constants/colors";
import Button from "../buttons/Button";
import Text from "../typography/Text";
const FileInput = ({ setFile }: { setFile: (file: File) => void }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <Button variant='lightButtonVariant'>
      <label htmlFor='file-upload' style={{ cursor: "pointer" }}>
        <Text color={colors.textSecondary}>Upload Profile Picture</Text>
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
