import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SystemAdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">System Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/system-admin/dashboard">Dashboard</Link>
          <Link to="/system-admin/tenants">Tenants</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-600 px-3 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
