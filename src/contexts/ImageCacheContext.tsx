import { createContext, useContext, useRef } from "react";
import { getDownloadURL } from "firebase/storage";
import { getStorageRef } from "../services/firebase/storage/storageService";

type ImageCacheContextType = {
  getCachedUrl: (path: string) => Promise<string>;
  seedUrl: (path: string, url: string) => void;
};

const ImageCacheContext = createContext<ImageCacheContextType>({
  getCachedUrl: (path) => getDownloadURL(getStorageRef(path)),
  seedUrl: () => {},
});

export function ImageCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useRef<Map<string, Promise<string>>>(new Map());

  const getCachedUrl = (path: string) => {
    const existing = cache.current.get(path);
    if (existing) return existing;
    const promise = getDownloadURL(getStorageRef(path)).catch((error) => {
      cache.current.delete(path);
      throw error;
    });
    cache.current.set(path, promise);
    return promise;
  };

  const seedUrl = (path: string, url: string) => {
    if (!cache.current.has(path)) {
      cache.current.set(path, Promise.resolve(url));
    }
  };

  return (
    <ImageCacheContext.Provider value={{ getCachedUrl, seedUrl }}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export function useImageCache() {
  return useContext(ImageCacheContext);
}
