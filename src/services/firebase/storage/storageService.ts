import { getStorage, uploadBytes, ref } from "firebase/storage";
export const storage = getStorage();

export function getStorageRef(path: string) {
  return ref(storage, path);
}
export function uploadFile(file: File, path: string) {
  const storageRef = getStorageRef(path);
  return uploadBytes(storageRef, file);
}
