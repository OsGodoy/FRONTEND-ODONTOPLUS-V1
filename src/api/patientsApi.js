import { getData } from "./apiFactory";
import api from "./axios";

export const getPatients = async () => {
  return await getData("/patients");
};
