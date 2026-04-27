import { getData } from "./apiFactory";
import api from "./axios";

export const getAvailableDoctors = async (params) => {
  return await getData("/availability/available-doctors", params);
};
