export type Role = "SYSTEM_ADMIN" | "TENANT_ADMIN" | string;

export interface AuthState {
  token: string | null;
  role: Role | null;
  tenantId?: number | null;
  email?: string | null;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (token: string) => Role;
  logout: () => void;
}