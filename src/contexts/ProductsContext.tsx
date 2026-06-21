import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getProducts } from "../services/firebase/products";

type ProductsContextType = {
  products: any[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  refreshProducts: async () => {},
  setProducts: () => {},
});

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    const response = await getProducts();
    setProducts(response);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <ProductsContext.Provider
      value={{ products, loading, refreshProducts, setProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
