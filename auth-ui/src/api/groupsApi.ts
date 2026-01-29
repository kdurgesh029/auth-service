import api from "./axios";

export const getGroups = () => api.get("/groups");

export const createGroup = (data: {
  groupCode: string;
  description: string;
}) => api.post("/groups", data);
