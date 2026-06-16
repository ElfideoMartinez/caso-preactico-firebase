import { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import Search from "../components/inputs/search";
import UsersTable from "../components/tables/UsersTable";
import { getAllUsers } from "../services/firebase/users";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UsersTable searchTerm={searchTerm} users={users} />
    </Card>
  );
};

export default Users;
