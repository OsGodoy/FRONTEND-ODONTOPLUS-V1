import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  appointmentStatus,
} from "../api/appointmentsApi";
import { useGetData, useMutationData } from "./useQueryBase";
import { updateData } from "../api/apiFactory";

export const useGetAppointments = (filters = {}) => {
  const { data, isLoading, isError, error, isFetching, refetch } = useGetData(
    queryKeys.appointments,
    getAppointments,
    filters,
  );

  return {
    appointments: data,
    isAppointmentsLoading: isLoading,
    isAppointmentsError: isError,
    appointmentsError: error,
    isAppointmentsFetching: isFetching,
    refetchAppointments: refetch,
  };
};

export const useCreateAppointment = () => {
  const { execute, isPending, ...rest } = useMutationData(
    queryKeys.appointments,
    createAppointment,
  );

  return {
    createAppointment: execute,
    isCreating: isPending,
    ...rest,
  };
};

export const useUpdateAppointment = () => {
  const { execute, executeAsync, isPending, ...rest } = useMutationData(
    queryKeys.appointments,
    updateAppointment,
  );

  return {
    updateAppointment: execute,
    updateAppointmentAsync: executeAsync,
    isUpdating: isPending,
    ...rest,
  };
};

export const useUpdateStatus = (options = {}) => {
  const { execute, executeAsync, isPending, ...rest } = useMutationData(
    queryKeys.appointments,
    ({ id, status }) => appointmentStatus(id, status),
    options,
  );

  return {
    updateStatus: execute,
    updateStatusAsync: executeAsync,
    isUpdatingStatus: isPending,
    ...rest,
  };
};
