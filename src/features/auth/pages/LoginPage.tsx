import AuthCard from "../components/AuthCard";
import { colors } from "../../../constants/colors";

function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.surface,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthCard />
    </div>
  );
}

export default LoginPage;
