import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { getPatients } from "../api/patientsApi";
import { useGetData } from "./useQueryBase";

export const usePatients = () => {
  const { data, isLoading, isError } = useGetData(
    queryKeys.patients,
    getPatients,
  );

  return {
    patients: data,
    isPatientsLoading: isLoading,
    isPatientsError: isError,
  };
};
