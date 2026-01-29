import { useEffect, useState } from "react";
import { getTenants, createTenant } from "../../api/tenantsApi";

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadTenants = async () => {
    const res = await getTenants();
    setTenants(res.data);
  };

  useEffect(() => {
    loadTenants();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTenant({ name, description });
    setName("");
    setDescription("");
    loadTenants();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

      {/* Create Tenant Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="font-semibold mb-2">Create Tenant</h2>
        <input
          className="border p-2 mr-2"
          placeholder="Tenant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Tenants Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.id}</td>
              <td className="p-2">{t.name}</td>
              <td className="p-2">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
