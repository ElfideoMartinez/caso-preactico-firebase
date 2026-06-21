import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import PedidosPage from "../pages/PedidosPage";
import ProtectedRoute from "../components/routes/ProtectedRoutes";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Inventory from "../pages/Inventory";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import NotAllowed from "../pages/NotAllowed";
import Sales from "../pages/Sales";
import RoleRedirect from "../components/routes/RoleRedirect";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='not-allowed' element={<NotAllowed />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<RoleRedirect />} />
          <Route
            path='/pedidos'
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <PedidosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/productos'
            element={
              <ProtectedRoute allowedRoles={["user", "sales"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path='/inventory'
            element={
              <ProtectedRoute allowedRoles={["provider", "sales"]}>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/sales'
            element={
              <ProtectedRoute allowedRoles={["sales"]}>
                <Sales />
              </ProtectedRoute>
            }
          />
          <Route
            path='/checkout'
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
