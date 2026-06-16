import { useState } from "react";
import Card from "../../../components/cards/Card";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import Text from "../../../components/typography/Text";
import { colors } from "../../../constants/colors";
import {
  login,
  register,
  loginWithGoogle,
} from "../../../services/firebase/authServices";
import { addNewUser } from "../../../services/firebase/users";
import { useNavigate } from "react-router-dom";

function AuthCard() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const navigate = useNavigate();

  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          minWidth: 400,
        }}
      >
        <Text size={28} weight={700}>
          {isRegister ? "Create account" : "Welcome back"}
        </Text>
        <Text color={colors.textSecondary}>
          {isRegister ? "Register to continue" : "Sign in to your account"}
        </Text>
        {isRegister && (
          <Input
            placeholder='Display name'
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
          />
        )}
        <Input
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder='Password'
          type='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {isRegister && (
          <Input
            placeholder='Confirm password'
            type='password'
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}
        <Button
          onClick={async () => {
            try {
              if (isRegister) {
                const newUser = await register(
                  formData.email,
                  formData.password,
                );
                console.log("New user created:", newUser);
                await addNewUser({
                  uid: newUser.user.uid,
                  email: newUser.user.email,
                  displayName: newUser.user.displayName,
                  photoURL: newUser.user.photoURL,
                });
              } else {
                const user = await login(formData.email, formData.password);
                console.log("User logged in:", user);
              }
              navigate("/dashboard");
            } catch (error) {
              console.error("Authentication error:", error);
            }
          }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
        <button
          style={{
            border: "none",
            background: "transparent",
            color: colors.primary,
            cursor: "pointer",
            fontSize: 14,
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account?" : "Create account"}
        </button>
        <Text color={colors.textSecondary}>Or sign in with Google</Text>
        <Button
          onClick={async () => {
            try {
              const user = await loginWithGoogle();
              console.log("User logged in with Google:", user);
              await addNewUser({
                uid: user.user.uid,
                email: user.user.email,
                displayName: user.user.displayName,
                photoURL: user.user.photoURL,
              });

              navigate("/dashboard");
            } catch (error) {
              console.error("Authentication error:", error);
            }
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </Card>
  );
}

export default AuthCard;
