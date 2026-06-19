import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import Search from "../components/inputs/search";
import UsersTable from "../components/tables/UsersTable";
import { getAllUsers } from "../services/firebase/users";
import Button from "../components/buttons/Button";
import AddNewUserModal from "../components/modals/addNewUserModal";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<
    Array<{ displayName: string; email: string; role: string; uid: string }>
  >([]);
  useEffect(() => {
    document.title = "Usuarios - Innovate Solutions";
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <Card style={{ padding: 24, display: "flex", flexDirection: "column" }}>
      <AddNewUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <Text size={typography.h1} weight={700}>
        Gestión de Usuarios
      </Text>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Text style={{ marginTop: 16 }}>Total de usuarios: {users.length}</Text>
      <UsersTable searchTerm={searchTerm} users={users} />
      <Button onClick={() => setIsModalOpen(true)}>
        Agregar nuevo usuario
      </Button>
    </Card>
  );
};

export default Users;
