import api from "./axios";

export const getAppointments = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search?.trim()) {
    params.append("search", filters.search.trim());
  }

  const queryString = params.toString();
  const url = queryString ? `/appointments?${queryString}` : `/appointments`;

  const { data } = await api.get(url);
  return data.data;
};

export const createAppointment = async (appointment) => {
  const { data } = await api.post("/appointments", appointment);
  return data.data;
};

export const updateAppointment = async ({ id, ...data }) => {
  const response = await api.patch(`/appointments/${id}`, data);
  return response.data;
};

export const appointmentStatus = async (id, status) => {
  const { data } = await api.patch(`/appointments/${id}/status`, {
    status,
  });
  return data.data;
};
