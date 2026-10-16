import { Outlet } from "react-router";
import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b p-3 bg-indigo-700">
        <Navbar />
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        <aside className="w-60 shrink-0 border-r p-4">
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
