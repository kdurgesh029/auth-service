import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ role, children }: any) {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role && role !== userRole) {
    if (userRole === "SYSTEM_ADMIN")
      return <Navigate to="/system-admin/dashboard" replace />;
    if (userRole === "TENANT_ADMIN")
      return <Navigate to="/tenant-admin/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
