import { useEffect } from "react";
import Text from "../typography/Text";
import DataTable from "react-data-table-component";
import { typography } from "../../constants/typography";
import Select from "../inputs/Select";
import { updateProfile } from "../../services/firebase/users/updateProfile";

const UsersTable = ({
  users,
}: {
  searchTerm: string;
  users: Array<{
    uid: string;
    displayName: string;
    email: string;
    role: string;
  }>;
}) => {
  useEffect(() => {
    document.title = "Usuarios - Comercializadora Nova";
  }, []);
  const handleUpdate = async (uid: string, field: string, value: string) => {
    try {
      await updateProfile({ uid, [field]: value });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  if (users.length === 0) {
    return <Text size={typography.h1}>No se encontraron usuarios.</Text>;
  }
  return (
    <DataTable
      title='Usuarios'
      columns={[
        {
          name: "Nombre",
          selector: (row) => row.displayName,
          sortable: true,
        },
        {
          name: "Correo electrónico",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Rol",
          selector: (row) => (
            <Select
              initialValue={row.role}
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
              onChange={async (value) => {
                await handleUpdate(row.uid, "role", value);
              }}
            />
          ),
          sortable: true,
        },
      ]}
      data={users}
      pagination
      highlightOnHover
      pointerOnHover
    />
  );
};

export default UsersTable;
