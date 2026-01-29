import { useEffect, useState } from "react";
import {
  getGroupsByTenant,
  createGroup,
  assignFunctionsToGroup,
} from "../../api/groupsApi";
import { getFunctionsByTenant } from "../../api/functionsApi";
import { useAuth } from "../../hooks/useAuth";

type UserGroup = {
  groupId: number;
  groupCode: string;
  description: string;
};

type AppFunction = {
  id: number;
  functionCode: string;
  description: string;
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [groupCode, setGroupCode] = useState("");
  const [description, setDescription] = useState("");
  const [functions, setFunctions] = useState<AppFunction[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedFunctionIds, setSelectedFunctionIds] = useState<number[]>([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);
  const { tenantId } = useAuth();

  const loadGroups = async () => {
    if (!tenantId) return;
    const res = await getGroupsByTenant(tenantId);
    setGroups(res.data);
  };

  const loadFunctions = async () => {
    if (!tenantId) return;
    const res = await getFunctionsByTenant(tenantId);
    setFunctions(res.data);
  };

  useEffect(() => {
    loadGroups();
    loadFunctions();
  }, [tenantId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGroup({ groupCode, description });
    setGroupCode("");
    setDescription("");
    loadGroups();
  };

  const toggleFunctionSelection = (functionId: number) => {
    setSelectedFunctionIds((prev) =>
      prev.includes(functionId)
        ? prev.filter((id) => id !== functionId)
        : [...prev, functionId]
    );
  };

  const handleAssignFunctions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroupId || selectedFunctionIds.length === 0) return;
    setAssignError(null);
    setAssignSuccess(null);
    setAssignLoading(true);
    try {
      await assignFunctionsToGroup(selectedGroupId, selectedFunctionIds);
      setAssignSuccess("Functions assigned to group successfully.");
    } catch (err: any) {
      setAssignError(
        err.response?.data?.message || "Failed to assign functions to group"
      );
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Group Management</h1>

      {!tenantId && (
        <p className="text-red-600 mb-4">
          Tenant context is missing. Please log in as a tenant admin.
        </p>
      )}

      {/* Create Group */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="font-semibold mb-2">Create Group</h2>

        <input
          className="border p-2 mr-2"
          placeholder="Group Code (e.g., ADMIN, MANAGER)"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Groups Table */}
        <div>
          <h2 className="font-semibold mb-2">Groups</h2>
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Group ID</th>
                <th className="p-2 text-left">Group Code</th>
                <th className="p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr
                  key={g.groupId}
                  className={`border-t cursor-pointer ${
                    g.groupId === selectedGroupId ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    setSelectedGroupId(g.groupId);
                    setAssignSuccess(null);
                    setAssignError(null);
                  }}
                >
                  <td className="p-2">{g.groupId}</td>
                  <td className="p-2">{g.groupCode}</td>
                  <td className="p-2">{g.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Function Assignment */}
        <div>
          <h2 className="font-semibold mb-2">Assign Functions to Group</h2>
          <p className="text-sm text-gray-600 mb-2">
            Select a group on the left, then choose functions to assign.
          </p>

          {assignError && (
            <p className="text-red-600 mb-2">{assignError}</p>
          )}
          {assignSuccess && (
            <p className="text-green-600 mb-2">{assignSuccess}</p>
          )}

          <form onSubmit={handleAssignFunctions} className="bg-white p-4 rounded shadow">
            <div className="max-h-64 overflow-y-auto mb-4 border rounded p-2">
              {functions.length === 0 && (
                <p className="text-sm text-gray-500">
                  No functions found for this tenant.
                </p>
              )}
              {functions.map((f) => (
                <label
                  key={f.id}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFunctionIds.includes(f.id)}
                    onChange={() => toggleFunctionSelection(f.id)}
                  />
                  <span className="font-mono text-sm">{f.functionCode}</span>
                  {f.description && (
                    <span className="text-xs text-gray-500">
                      - {f.description}
                    </span>
                  )}
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={
                !selectedGroupId ||
                selectedFunctionIds.length === 0 ||
                assignLoading
              }
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {assignLoading ? "Assigning..." : "Assign Selected Functions"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
