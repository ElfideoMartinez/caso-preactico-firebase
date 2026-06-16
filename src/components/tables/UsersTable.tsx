import { useEffect } from "react";
import Text from "../typography/Text";

const UsersTable = ({
  searchTerm,
  users,
}: {
  searchTerm: string;
  users: Array<{ displayName: string; email: string; role: string }>;
}) => {
  useEffect(() => {
    document.title = "Usuarios - Innovate Solutions";
  }, []);
  useEffect(() => {
    // Aquí podrías agregar lógica para filtrar los usuarios según el searchTerm
    console.log("Search term updated:", searchTerm);
  }, [searchTerm]);
  if (users.length === 0) {
    return <Text>No se encontraron usuarios.</Text>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
