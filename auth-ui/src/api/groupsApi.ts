import api from "./axios";

export const getGroupsByTenant = (tenantId: number) =>
  api.get(`/api/groups/tenant/${tenantId}`);

export const createGroup = (data: {
  groupCode: string;
  description: string;
}) => api.post("/api/groups", data);

export const assignFunctionsToGroup = (
  groupId: number,
  functionIds: number[]
) => api.post(`/api/groups/${groupId}/functions`, functionIds);
