import { useEffect, useState } from "react";
import { spacing } from "../../constants/spacing";
import Card from "../cards/Card";
import Text from "../typography/Text";
import { getStorageRef } from "../../services/firebase/storage/storageService";
import { getDownloadURL } from "firebase/storage";
import { useAuth } from "../../contexts/AuthContext";
import { typography } from "../../constants/typography";
import { colors } from "../../constants/colors";
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

  const photo = userPhotoURL || authUser?.photoURL || null;
  const displayName = user?.displayName || authUser?.displayName || "Usuario";
  const initial = (displayName || user?.email || "U").charAt(0).toUpperCase();
  const isAdmin = user?.role === "admin";

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
        {photo ? (
          <img
            src={photo}
            alt='User Avatar'
            style={{
              width: 72,
              height: 72,
              borderRadius: "100%",
              objectFit: "cover",
              border: `2px solid ${colors.border}`,
            }}
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "100%",
              background: colors.gradients.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text size={typography.h2} weight={700} color={colors.white}>
              {initial}
            </Text>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
          }}
        >
          <Text size={typography.h2} weight={700}>
            {displayName}
          </Text>
          <Text size={typography.body} color={colors.textSecondary}>
            {user?.email || "N/A"}
          </Text>
          <span
            style={{
              alignSelf: "flex-start",
              marginTop: spacing.xs,
              background: isAdmin ? colors.successLight : colors.surfaceHover,
              color: isAdmin ? colors.success : colors.textSecondary,
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: typography.small,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {user?.role || "user"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default OrdersHeader;
