import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import ProtectedRoute from "../auth/ProtectedRoute";

import SystemAdminLayout from "../layout/SystemAdminLayout";
//import TenantAdminLayout from "../layout/TenantAdminLayout";

import TenantAdminHome from "../layout/TenantAdminHome";

// System Admin Pages
import SystemDashboard from "../system-admin/pages/Dashboard";
import TenantsPage from "../system-admin/pages/TenantsPage";

// Tenant Admin Pages
import TenantDashboard from "../tenant-admin/pages/Dashboard";
import UsersPage from "../tenant-admin/pages/UsersPage";
import GroupsPage from "../tenant-admin/pages/GroupsPage";
import FunctionsPage from "../tenant-admin/pages/FunctionsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* SYSTEM ADMIN AREA */}
        <Route
          path="/system-admin"
          element={
            <ProtectedRoute role="SYSTEM_ADMIN">
              <SystemAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<SystemDashboard />} />
          <Route path="tenants" element={<TenantsPage />} />
        </Route>

        {/* TENANT ADMIN AREA */}
        <Route
          path="/tenant-admin"
          element={
            <ProtectedRoute role="TENANT_ADMIN">
              <TenantAdminHome />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="functions" element={<FunctionsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
