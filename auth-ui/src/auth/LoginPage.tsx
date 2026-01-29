import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState(""); // required for tenant users
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (role === "SYSTEM_ADMIN") navigate("/system-admin/dashboard", { replace: true });
    else if (role) navigate("/tenant-admin/dashboard", { replace: true });
  }, [isAuthenticated, role, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
        tenantId: tenantId ? Number(tenantId) : null,
      });

      const { token } = res.data;

      const derivedRole = login(token);

      if (derivedRole === "SYSTEM_ADMIN") {
        navigate("/system-admin/dashboard", { replace: true });
      } else {
        navigate("/tenant-admin/dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">IAM Login</h2>

        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          required
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="\\d*"
          name="tenantId"
          autoComplete="off"
          placeholder="Tenant ID (only for tenant users)"
          className="w-full mb-4 p-2 border rounded"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value.replace(/[^\d]/g, ""))}
          disabled={isSubmitting}
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
