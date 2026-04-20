import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMe, login, logout } from "../api/authApi";
import { queryKeys } from "../constants/queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth });

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {

      await queryClient.invalidateQueries({ queryKey: queryKeys.auth });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useAuth = () => {
  const query = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    isError: query.isError,
  };
};
