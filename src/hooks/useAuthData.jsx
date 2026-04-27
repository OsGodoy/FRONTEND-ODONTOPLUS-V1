import { login, logout, getMe } from "../api/authApi";
import { queryKeys } from "../constants/queryKeys";
import { useGetDataById, useMutationData } from "../hooks/useQueryBase";

export const useLogin = () => {
  // Invalidación automática de la clave de autenticación y el carrito.
  return useMutationData(queryKeys.auth, login, {
    onSuccess: async (data, variables, context, queryClient) => {
      // Invalidación del carrito adicionalmente al key principal
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useLogout = () => {
  return useMutationData(queryKeys.auth, logout, {
    onSuccess: async (data, variables, context, queryClient) => {
      queryClient.clear();
    },
  });
};

export const useAuth = () => {
  // Uso de useGetDataById para traer el un objeto único (null o user)
  const {
    data: user,
    isLoading,
    isError,
  } = useGetDataById(
    queryKeys.auth,
    getMe,
    "current", // Identificador ficticio para la queryKey: [auth, "current"]
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isError,
  };
};
