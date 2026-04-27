import { getData, patchData, postData } from "./apiFactory";
import api from "./axios";

export const getAppointments = async (filters = {}) => {
  const params = {
    ...filters,
  };

  return await getData("/appointments", params);
};

export const createAppointment = async (appointment) => {
  return await postData("/appointments", appointment);
};

export const updateAppointment = async ({ id, ...data }) => {
  return await patchData(`/appointments/${id}`, data);
};

export const appointmentStatus = async (id, status) => {
  return await patchData(`/appointments/${id}/status`, {
    status,
  });
};
