import { useEffect, useState } from "react";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { getStorageRef } from "../../services/firebase/storage/storageService";
import { getDownloadURL } from "firebase/storage";

interface NewProductImageInputProps {
  handleImageUpload?: (file: File) => Promise<void>;
}

const NewProductImageInput = ({
  handleImageUpload,
}: NewProductImageInputProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  useEffect(() => {
    const defaultImageRef = getStorageRef(
      "/default_images/istockphoto-2173059563-1024x1024.jpg",
    );
    getDownloadURL(defaultImageRef).then((url) => setDefaultImage(url));
  }, []);

  return (
    <label
      htmlFor='product-image-input'
      style={{
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        padding: spacing.lg,
        borderRadius: "8px",
      }}
    >
      <img
        src={
          selectedFile
            ? URL.createObjectURL(selectedFile)
            : defaultImage || "/placeholder.png"
        }
        alt='Product Image'
        style={{
          objectFit: "cover",
          height: "300px",
          width: "300px",
          alignSelf: "center",
          marginBottom: spacing.md,
        }}
      />
      <span style={{ fontSize: typography.body, textAlign: "center" }}>
        <FontAwesomeIcon icon={faUpload} /> Subir imagen
      </span>
      <input
        id='product-image-input'
        style={{
          alignSelf: "center",
        }}
        hidden
        type='file'
        accept='image/*'
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileName = file.name.replace(/\s+/g, "_");
            const newFile = new File([file], fileName, { type: file.type });
            setSelectedFile(newFile);
            if (handleImageUpload) {
              handleImageUpload(newFile).catch((error) => {
                console.error("Error uploading image: ", error);
              });
            }
          }
        }}
      />
    </label>
  );
};

export default NewProductImageInput;
