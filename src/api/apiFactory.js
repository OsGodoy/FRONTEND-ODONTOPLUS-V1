import api from "./axios";
import { toast } from "sonner";

// Manejar desempaquetador de datos
const handleResponse = (response, defaultValue = []) => {
  return response?.data?.data ?? response?.data ?? defaultValue;
};

// Extraer mensajes de error del backend
const getErrorMessage = (error) => {
  return error.response?.data?.message || "Ocurrió un error inesperado";
};

// METODOS

export const getData = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return handleResponse(response, []);
  } catch (error) {
    console.error(`[GET Error] ${url}:`, error);
    return [];
  }
};

export const getDataById = async (url, id) => {
  try {
    const response = await api.get(`${url}/${id}`);
    return handleResponse(response, null);
  } catch (error) {
    console.error(`[GET BY ID Error] ${url}/${id}:`, error);
    toast.error("No se pudo cargar la información solicitada");
    return null;
  }
};

export const updateData = async (
  method,
  url,
  payload = null,
  showToast = true,
) => {
  const methodUpper = method.toUpperCase();
  const methodLower = method.toLowerCase();

  const request = api[methodLower](url, payload);

  if (showToast) {
    const messages = {
      loading: "Cargando...",
      success: (response) => {
        if (methodUpper === "POST") return "Creado exitosamente";
        if (methodUpper === "PUT" || methodUpper === "PATCH")
          return "Actualizado exitosamente";
        if (methodUpper === "DELETE") return "Eliminado correctamente";
        return "Operación exitosa";
      },
      error: (err) => getErrorMessage(err),
    };

    toast.promise(request, messages);
  }

  try {
    const response = await request;
    const data = response.data;

    if (data?.status === "fail" || data?.status === "error") {
      const errorMsg = data.message || "Error en la operación";
      throw new Error(errorMsg);
    }

    return handleResponse(response, null);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[${methodUpper} Error] ${url}:`, message);

    if (!showToast) toast.error(message);

    throw error;
  }
};

// Alias para utilizar updateData

export const postData = async (url, payload, showToast) =>
  await updateData("POST", url, payload, showToast);

export const putData = async (url, payload, showToast) =>
  await updateData("PUT", url, payload, showToast);

export const patchData = async (url, payload, showToast) =>
  await updateData("PATCH", url, payload, showToast);

export const deleteData = async (url, showToast) =>
  await updateData("DELETE", url, null, showToast);
