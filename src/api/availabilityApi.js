import api from "./axios";

export const getAvailableDoctors = async (params) => {
  const { data } = await api.get("/availability/available-doctors", { params });
  return data.data;
};
