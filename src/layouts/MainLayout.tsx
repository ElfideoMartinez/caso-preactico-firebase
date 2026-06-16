import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        {sidebarOpen && <Sidebar />}

        <main
          style={{
            flex: 1,
            padding: 32,
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
