import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { getDoctors } from "../api/doctorsApi";

export const useDoctors = () => {
  const doctorsQuery = useQuery({
    queryKey: queryKeys.doctors,
    queryFn: getDoctors,
  });

  return {
    doctors: doctorsQuery.data ?? [],
    isLoading: doctorsQuery.isLoading,
    isError: doctorsQuery.isError,
  };
};
