import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import PedidosPage from "../pages/PedidosPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/pedidos' element={<PedidosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
