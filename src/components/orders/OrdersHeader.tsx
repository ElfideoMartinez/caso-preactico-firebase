import { useEffect, useState } from "react";
import { spacing } from "../../constants/spacing";
import Card from "../cards/Card";
import Text from "../typography/Text";
import { getStorageRef } from "../../services/firebase/storage/storageService";
import { getDownloadURL } from "firebase/storage";
import { useAuth } from "../../contexts/AuthContext";
import { typography } from "../../constants/typography";
interface OrdersHeaderProps {
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    role: string | null;
  } | null;
}

const OrdersHeader = ({ user }: OrdersHeaderProps) => {
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(
    user?.photoURL || null,
  );
  const { user: authUser } = useAuth();
  useEffect(() => {
    const fetchUserPhotoURL = async () => {
      if (user?.photoURL) {
        const storageRef = getStorageRef(user.photoURL);
        const downloadURL = await getDownloadURL(storageRef);
        setUserPhotoURL(downloadURL);
      }
    };
    fetchUserPhotoURL();
  }, [user]);
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
        <img
          src={
            userPhotoURL ||
            authUser?.photoURL ||
            "https://via.placeholder.com/80"
          }
          alt='User Avatar'
          style={{ width: 80, height: 80, borderRadius: "100%" }}
        />
        {user && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
            }}
          >
            <div
              style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
            >
              <Text weight={700}>Name: </Text>
              <Text size={typography.body}>{user.displayName || "N/A"}</Text>
            </div>
            <div
              style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
            >
              <Text weight={700}>Email: </Text>
              <Text size={typography.body}>{user.email || "N/A"}</Text>
            </div>
            <div
              style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
            >
              <Text weight={700}>Role: </Text>
              <Text size={typography.body}>{user.role || "N/A"}</Text>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrdersHeader;
