import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  appointmentStatus,
} from "../api/appointmentsApi";

export const useAppointments = (filters = {}) => {
  const queryClient = useQueryClient();

  const {
    data: appointmentsData,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.appointments(filters),
    queryFn: () => getAppointments(filters),
  });

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment(variables.id),
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => appointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  return {
    appointments: appointmentsData ?? [],
    isLoading,
    isError,

    createAppointment: createMutation.mutateAsync,
    updateAppointment: updateMutation.mutateAsync,
    updateStatus: statusMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isUpdatingStatus: statusMutation.isPending,

    error:
      createMutation.error ||
      updateMutation.error ||
      statusMutation.error ||
      queryError,
  };
};
