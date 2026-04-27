import { getData } from "./apiFactory";
import api from "./axios";

export const getDoctors = async () => {
  return await getData("/doctors");
};
