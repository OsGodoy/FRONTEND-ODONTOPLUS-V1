import { useQuery } from "@tanstack/react-query";
import { getAvailableDoctors } from "../api/availabilityApi";
import { queryKeys } from "../constants/queryKeys";
import { useGetData } from "./useQueryBase";

export const useAvailableDoctors = (params = {}) => {
  const { data, isLoading, isError, ...rest } = useGetData(
    queryKeys.availableDoctors(params),
    getAvailableDoctors,
    params,
    {
      enabled: !!params?.date && !!params?.start_time && !!params?.end_time,
      staleTime: 0,
    },
  );

  return {
    availableDoctors: data,
    isAvailablesLoading: isLoading,
    isAvailablesError: isError,
    ...rest,
  };
};
