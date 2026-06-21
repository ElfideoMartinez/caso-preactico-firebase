import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import Search from "../components/inputs/search";
import UsersTable from "../components/tables/UsersTable";
import { getAllUsers } from "../services/firebase/users";
import Button from "../components/buttons/Button";
import AddNewUserModal from "../components/modals/addNewUserModal";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";
import { colors } from "../constants/colors";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<
    Array<{ displayName: string; email: string; role: string; uid: string }>
  >([]);
  useEffect(() => {
    document.title = "Usuarios - Comercializadora Nova";
  }, []);
  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Card
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
      }}
    >
      <AddNewUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onUserAdded={fetchUsers}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: spacing.md,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
          }}
        >
          <Text size={typography.h1} weight={700}>
            Gestión de Usuarios
          </Text>
          <Text color={colors.textSecondary}>
            {users.length} {users.length === 1 ? "usuario" : "usuarios"}
          </Text>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          Agregar nuevo usuario
        </Button>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UsersTable searchTerm={searchTerm} users={users} />
    </Card>
  );
};

export default Users;
