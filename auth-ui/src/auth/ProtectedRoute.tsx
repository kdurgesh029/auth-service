import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ role, children }: any) {
  const { token, role: userRole } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/login" />;

  return children;
}
