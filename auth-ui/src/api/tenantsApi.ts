import api from "./axios";

export const getTenants = () => api.get("/tenants");

export const createTenant = (data: {
  name: string;
  description: string;
}) => api.post("/tenants", data);
