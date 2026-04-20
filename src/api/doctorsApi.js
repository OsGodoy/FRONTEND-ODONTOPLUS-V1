import api from "./axios";

export const getDoctors = async () => {
  const { data } = await api.get("/doctors");
  return data.data;
};
