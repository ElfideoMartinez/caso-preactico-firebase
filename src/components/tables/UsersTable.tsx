import { useEffect } from "react";
import Text from "../typography/Text";
import { spacing } from "../../constants/spacing";
import { colors } from "../../constants/colors";

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
    console.log("Search term updated:", users);
  }, [searchTerm]);
  if (users.length === 0) {
    return <Text>No se encontraron usuarios.</Text>;
  }
  return (
    <table
      style={{
        border: `1px solid ${colors.border}`,
        width: "100%",
        borderCollapse: "collapse",
        gap: spacing.md,
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
        borderRadius: spacing.sm,
      }}
    >
      <thead style={{ backgroundColor: colors.primaryLight }}>
        <tr>
          <th style={{ textAlign: "left", padding: spacing.md }}>Nombre</th>
          <th style={{ textAlign: "left", padding: spacing.md }}>Email</th>
          <th style={{ textAlign: "left", padding: spacing.md }}>Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={index}
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <td style={{ textAlign: "left", padding: spacing.sm }}>
              {user.displayName}
            </td>
            <td style={{ textAlign: "left", padding: spacing.sm }}>
              {user.email}
            </td>
            <td style={{ textAlign: "left", padding: spacing.sm }}>
              {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
