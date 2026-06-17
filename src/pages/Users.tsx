import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import Search from "../components/inputs/search";
import UsersTable from "../components/tables/UsersTable";
import { getAllUsers } from "../services/firebase/users";
import Button from "../components/buttons/Button";
import AddNewUserModal from "../components/modals/addNewUserModal";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<
    Array<{ displayName: string; email: string; role: string }>
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
    <Card>
      <AddNewUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <Button onClick={() => setIsModalOpen(true)}>
        Agregar nuevo usuario
      </Button>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UsersTable searchTerm={searchTerm} users={users} />
    </Card>
  );
};

export default Users;
