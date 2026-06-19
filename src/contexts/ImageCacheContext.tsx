import { createContext, useContext, useRef } from "react";
import { getDownloadURL } from "firebase/storage";
import { getStorageRef } from "../services/firebase/storage/storageService";

type GetCachedUrl = (path: string) => Promise<string>;

const ImageCacheContext = createContext<GetCachedUrl>((path) =>
  getDownloadURL(getStorageRef(path)),
);

export function ImageCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useRef<Map<string, Promise<string>>>(new Map());

  const getCachedUrl: GetCachedUrl = (path) => {
    const existing = cache.current.get(path);
    if (existing) return existing;
    const promise = getDownloadURL(getStorageRef(path)).catch((error) => {
      cache.current.delete(path);
      throw error;
    });
    cache.current.set(path, promise);
    return promise;
  };

  return (
    <ImageCacheContext.Provider value={getCachedUrl}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export function useImageCache() {
  return useContext(ImageCacheContext);
}
