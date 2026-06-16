import { useState } from "react";
import Card from "../../../components/cards/Card";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import Text from "../../../components/typography/Text";
import { colors } from "../../../constants/colors";
import { login, register } from "../../../services/firebase/authServices";
import { addNewUser } from "../../../services/firebase/users";

function AuthCard() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
            if (isRegister) {
              const newUser = await register(formData.email, formData.password);
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
      </div>
    </Card>
  );
}

export default AuthCard;
