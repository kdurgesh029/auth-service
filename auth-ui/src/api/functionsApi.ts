import api from "./axios";

export const getFunctions = () => api.get("/functions");

export const createFunction = (data: {
  functionCode: string;
  description: string;
}) => api.post("/functions", data);
