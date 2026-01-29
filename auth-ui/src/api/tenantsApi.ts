import api from "./axios";

export const getTenants = () => api.get("/api/tenants");

export const createTenant = (data: {
  name: string;
  description: string;
}) => api.post("/api/tenants", data);

export const updateTenant = (
  id: number,
  data: {
    name: string;
    description: string;
  }
) => api.put(`/api/tenants/${id}`, data);

export const deleteTenant = (id: number) => api.delete(`/api/tenants/${id}`);
