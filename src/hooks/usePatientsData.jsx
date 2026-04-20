import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { getPatients } from "../api/patientsApi";

export const usePatients = () => {
  const patientsQuery = useQuery({
    queryKey: queryKeys.patients,
    queryFn: getPatients,
  });

  return {
    patients: patientsQuery.data ?? [],
    isLoading: patientsQuery.isLoading,
    isError: patientsQuery.isError,
  };
};
