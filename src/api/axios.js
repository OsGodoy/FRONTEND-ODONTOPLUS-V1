import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR DE PETICIÓN
// Access Token en memoria o Header además de Cookies
api.interceptors.request.use(
  (config) => {
    // Guardar token en sessionStorage/state
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// INTERCEPTOR DE RESPUESTA
// Maneja el Refresh Token cuando expira el Access Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Rechaza si no hay respuestas o errores
    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest.url;

    // Rutas que NO deben activar el refresh automático para evitar bucles
    const authRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/me",
    ];
    const isAuthRoute = authRoutes.some((route) => url?.includes(route));

    // Si el error es 401 (No autorizado) y no es una ruta de auth
    if (status === 401 && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        // Intento de refresh
        // Con withCredentials: true, el endpoint /refresh lee automáticamente la Refresh Cookie y setea el nuevo Access Cookie

        await api.post("/auth/refresh");

        // Reintentamos la petición original con la nueva cookie/sesión seteada
        return api(originalRequest);
      } catch (refreshError) {
        // Sesión expirada definitivamente o Refresh Token inválido
        console.warn("La sesión ha expirado. Redirigiendo al login...");

        // Redirigir
        window.location.href = "/auth/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
