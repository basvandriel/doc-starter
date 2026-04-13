import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 px-10 py-10 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}
