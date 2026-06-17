import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import PedidosPage from "../pages/PedidosPage";
import ProtectedRoute from "../components/routes/ProtectedRoutes";
import Users from "../pages/Users";
import Products from "../pages/Products";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/pedidos'
            element={
              <ProtectedRoute>
                <PedidosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/productos'
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
