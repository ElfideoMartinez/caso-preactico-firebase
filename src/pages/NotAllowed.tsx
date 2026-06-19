import { useNavigate } from "react-router-dom";
import Card from "../components/cards/Card";
import { typography } from "../constants/typography";
import Button from "../components/buttons/Button";
import Text from "../components/typography/Text";

const NotAllowed = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "4rem",
      }}
    >
      <Text size={typography.h1}>Acceso no permitido</Text>
      <Text size={typography.body}>
        No tienes permiso para acceder a esta página.
      </Text>
      <Button variant='primaryButton' onClick={handleGoBack}>
        Volver
      </Button>
    </Card>
  );
};

export default NotAllowed;
