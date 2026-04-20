import api from "./axios";

export const getPatients = async () => {
  const { data } = await api.get("/patients");
  return data.data;
};
