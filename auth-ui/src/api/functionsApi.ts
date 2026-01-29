import api from "./axios";

export const getFunctionsByTenant = (tenantId: number) =>
  api.get(`/api/functions/tenant/${tenantId}`);

export const createFunction = (data: {
  functionCode: string;
  description: string;
}) => api.post("/api/functions", data);
