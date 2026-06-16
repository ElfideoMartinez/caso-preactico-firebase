import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

function MainLayout({ children }: { children?: React.ReactNode }) {
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
          {children}
        </main>
      </div>
    </>
  );
}

export default MainLayout;
