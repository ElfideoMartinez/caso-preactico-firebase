export const updateProfile = async ({
  uid,
  displayName,
  email,
  newPhotoFile,
}: {
  uid: string;
  displayName?: string;
  email?: string;
  newPhotoFile?: string;
}) => {
  try {
    const reponse = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}editUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          displayName,
          email,
          newPhotoFile,
        }),
      },
    );
    if (!reponse.ok) {
      const errorData = await reponse.json();
      throw new Error(
        `Failed to update profile: ${errorData.error || reponse.statusText}`,
      );
    }
  } catch (error) {
    console.error("An error occurred while editing the user:", error);
    throw error;
  }
};
