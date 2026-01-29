import { useEffect, useState } from "react";
import {
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../../api/tenantsApi";

type Tenant = {
  id: number;
  name: string;
  description: string;
};

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTenants = async () => {
    try {
      setLoading(true);
      const res = await getTenants();
      setTenants(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTenants();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createTenant({ name, description });
      setName("");
      setDescription("");
      await loadTenants();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (tenant: Tenant) => {
    setEditingId(tenant.id);
    setEditName(tenant.name);
    setEditDescription(tenant.description ?? "");
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      setLoading(true);
      await updateTenant(editingId, {
        name: editName,
        description: editDescription,
      });
      cancelEdit();
      await loadTenants();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update tenant");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) {
      return;
    }
    try {
      setLoading(true);
      await deleteTenant(id);
      await loadTenants();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Create Tenant Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="font-semibold mb-2">Create Tenant</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            className="border p-2 flex-1 min-w-[160px]"
            placeholder="Tenant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="border p-2 flex-1 min-w-[160px]"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </form>

      {/* Tenants Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Existing Tenants</h2>
        {tenants.length === 0 ? (
          <p className="text-sm text-gray-500">No tenants found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b p-2 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="border-b p-2 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="border-b p-2 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="border-b p-2 text-right text-sm font-semibold text-gray-700 w-40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.id} className="border-b last:border-b-0">
                    <td className="p-2 align-top text-sm font-mono text-gray-800">
                      {t.id}
                    </td>
                    <td className="p-2 align-top text-sm">
                      {editingId === t.id ? (
                        <input
                          className="border p-1 rounded w-full"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      ) : (
                        <span className="font-semibold">{t.name}</span>
                      )}
                    </td>
                    <td className="p-2 align-top text-sm">
                      {editingId === t.id ? (
                        <input
                          className="border p-1 rounded w-full"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          disabled={loading}
                        />
                      ) : (
                        <span className="text-gray-700">
                          {t.description || "-"}
                        </span>
                      )}
                    </td>
                    <td className="p-2 align-top text-right text-sm">
                      {editingId === t.id ? (
                        <form
                          onSubmit={handleUpdate}
                          className="inline-flex gap-2"
                        >
                          <button
                            type="submit"
                            className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-3 py-1 rounded border border-gray-300 text-gray-700"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => startEdit(t)}
                            className="px-3 py-1 rounded border border-blue-600 text-blue-600"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="px-3 py-1 rounded border border-red-600 text-red-600"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
