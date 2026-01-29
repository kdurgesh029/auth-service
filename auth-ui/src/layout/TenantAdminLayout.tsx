import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function TenantAdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Tenant Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/tenant-admin/dashboard">Dashboard</Link>
          <Link to="/tenant-admin/users">Users</Link>
          <Link to="/tenant-admin/groups">Groups</Link>
          <Link to="/tenant-admin/functions">Functions</Link>
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
