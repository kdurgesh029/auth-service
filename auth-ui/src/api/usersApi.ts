import api from "./axios";

export const getUsers = () => api.get("/users");

export const createUser = (data: {
  email: string;
  password: string;
}) => api.post("/users", data);
