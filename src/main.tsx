import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ImageCacheProvider } from "./contexts/ImageCacheContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ImageCacheProvider>
          <App />
        </ImageCacheProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
