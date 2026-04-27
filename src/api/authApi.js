import { postData } from "./apiFactory";
import api from "./axios";

export const login = async (credentials) => {
  return await postData("/auth/login", credentials, false);
};

export const logout = async () => {
  return await postData("/auth/logout");
};

export const getMe = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data?.data ?? data;
  } catch (error) {
    if (error.response?.status === 401) return null;
    console.error("Error real en getMe:", error);
    return null;
  }
};
