import Text from "../typography/Text";
import DataTable from "react-data-table-component";
import Select from "../inputs/Select";
import { updateProfile } from "../../services/firebase/users/updateProfile";
import { colors } from "../../constants/colors";
import { roleSelectOptions } from "../../constants/roles";
import { useAuth } from "../../contexts/AuthContext";

const UsersTable = ({
  searchTerm,
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
  const { user } = useAuth();
  const handleUpdate = async (uid: string, field: string, value: string) => {
    try {
      await updateProfile({ uid, [field]: value });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const term = searchTerm.trim().toLowerCase();
  const filteredUsers = term
    ? users.filter(
        (user) =>
          user.displayName?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.role?.toLowerCase().includes(term),
      )
    : users;
  const customStyles = {
    headRow: {
      style: {
        background: colors.surfaceHover,
        borderBottomColor: colors.border,
      },
    },
    headCells: {
      style: {
        color: colors.text,
        fontWeight: 700,
        fontSize: 14,
      },
    },
    rows: {
      style: {
        minHeight: 64,
        color: colors.text,
      },
    },
    pagination: {
      style: {
        backgroundColor: colors.backgroundColor,
        borderTopColor: colors.border,
      },
    },
  };
  if (filteredUsers.length === 0) {
    return (
      <Text color={colors.textSecondary}>No se encontraron usuarios.</Text>
    );
  }
  return (
    <DataTable
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
          cell: (row) => (
            <Select
              initialValue={row.role}
              options={roleSelectOptions}
              disabled={row.uid === user?.uid}
              onChange={async (value) => {
                await handleUpdate(row.uid, "role", value);
              }}
            />
          ),
          sortable: true,
        },
      ]}
      data={filteredUsers}
      pagination
      highlightOnHover
      pointerOnHover
      customStyles={customStyles}
    />
  );
};

export default UsersTable;
