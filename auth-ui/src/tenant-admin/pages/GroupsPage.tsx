import { useEffect, useState } from "react";
import { getGroups, createGroup } from "../../api/groupsApi";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [groupCode, setGroupCode] = useState("");
  const [description, setDescription] = useState("");

  const loadGroups = async () => {
    const res = await getGroups();
    setGroups(res.data);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGroup({ groupCode, description });
    setGroupCode("");
    setDescription("");
    loadGroups();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Group Management</h1>

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

      {/* Groups Table */}
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
            <tr key={g.groupId} className="border-t">
              <td className="p-2">{g.groupId}</td>
              <td className="p-2">{g.groupCode}</td>
              <td className="p-2">{g.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
