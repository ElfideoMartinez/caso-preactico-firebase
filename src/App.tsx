import Button from "./components/buttons/Button";
import Card from "./components/cards/Card";
import Text from "./components/typography/Text";

function App() {
  return (
    <Card>
      <h1>Proyecto listo</h1>
      <Text>
        Este es un proyecto de React con TypeScript, listo para ser utilizado
        como base para tus aplicaciones.
      </Text>
      <Button onClick={() => alert("¡Botón clickeado!")}>Haz clic aquí</Button>
    </Card>
  );
}

export default App;
