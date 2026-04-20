import api from "./axios";

export const login = async (credentials) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data.data;
};

export const getMe = async () => {
  try {
    const { data } = await api.get("/auth/me");
    console.log(data);

    return data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
