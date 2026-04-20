import { useQuery } from "@tanstack/react-query";
import { getAvailableDoctors } from "../api/availabilityApi";
import { queryKeys } from "../constants/queryKeys";

export const useAvailableDoctors = (params = {}) => {
  const availableDoctorsQuery = useQuery({
    queryKey: queryKeys.availableDoctors(params),
    queryFn: () => getAvailableDoctors(params),
    enabled: !!params?.date && !!params?.start_time && !!params?.end_time,
    staleTime: 0,
  });

  return {
    availableDoctors: availableDoctorsQuery.data ?? [],
    isLoading: availableDoctorsQuery.isLoading,
    isError: availableDoctorsQuery.isError,
  };
};
