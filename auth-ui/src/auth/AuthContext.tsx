import { createContext, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthState, Role } from "../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

function parseJwtPayload(token: string): any | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      Array.from(atob(padded))
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function deriveRoleFromToken(token: string): { role: Role; tenantId: number | null; email: string | null; authorities: string[] } {
  const payload = parseJwtPayload(token);
  const tenantId = payload?.tenantId ?? null;
  const email = payload?.sub ?? null;
  const authorities: string[] = Array.isArray(payload?.authorities)
    ? payload.authorities
    : typeof payload?.authorities === "string"
    ? [payload.authorities]
    : [];
  const role: Role = tenantId == null ? "SYSTEM_ADMIN" : "TENANT_ADMIN";
  return { role, tenantId, email, authorities };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const existingToken = localStorage.getItem("token");
  const existingDerived = existingToken ? deriveRoleFromToken(existingToken) : null;
  const [auth, setAuth] = useState<AuthState>({
    token: existingToken,
    role: existingDerived?.role ?? null,
    tenantId: existingDerived?.tenantId ?? null,
    email: existingDerived?.email ?? null,
    authorities: existingDerived?.authorities ?? [],
  });

  const login = (token: string) => {
    const derived = deriveRoleFromToken(token);
    localStorage.setItem("token", token);
    setAuth({
      token,
      role: derived.role,
      tenantId: derived.tenantId,
      email: derived.email,
      authorities: derived.authorities,
    });
    return derived.role;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, role: null, tenantId: null, email: null });
  };

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...auth,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
