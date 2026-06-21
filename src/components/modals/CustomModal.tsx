import Modal from "react-modal";
import Text from "../typography/Text";
import { typography } from "../../constants/typography";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          maxHeight: "max-content",
          maxWidth: "max-content",
          marginLeft: "auto",
          borderRadius: "12px",
          padding: "24px",
          gap: "16px",
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        },
      }}
    >
      {title && <Text size={typography.h1}>{title}</Text>}
      {children}
    </Modal>
  );
}
