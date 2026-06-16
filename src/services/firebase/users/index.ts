interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
export const addNewUser = async (user: User) => {
  const response = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}addNewUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );
  const result = await response.json();

  return result.data;
};
