import { useEffect, useState } from "react";
import { getFunctionsByTenant, createFunction } from "../../api/functionsApi";
import { useAuth } from "../../hooks/useAuth";

export default function FunctionsPage() {
  const [functions, setFunctions] = useState<any[]>([]);
  const [functionCode, setFunctionCode] = useState("");
  const [description, setDescription] = useState("");
  const { tenantId } = useAuth();

  const loadFunctions = async () => {
    if (!tenantId) return;
    const res = await getFunctionsByTenant(tenantId);
    setFunctions(res.data);
  };

  useEffect(() => {
    loadFunctions();
  }, [tenantId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFunction({ functionCode, description });
    setFunctionCode("");
    setDescription("");
    loadFunctions();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Function (Permission) Management</h1>

      {/* Create Function */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="font-semibold mb-2">Create Function</h2>

        <input
          className="border p-2 mr-2"
          placeholder="Function Code (e.g., USER_CREATE)"
          value={functionCode}
          onChange={(e) => setFunctionCode(e.target.value)}
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

      {/* Functions Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Function ID</th>
            <th className="p-2 text-left">Function Code</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {functions.map((f) => (
            <tr key={f.id} className="border-t">
              <td className="p-2">{f.id}</td>
              <td className="p-2">{f.functionCode}</td>
              <td className="p-2">{f.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
