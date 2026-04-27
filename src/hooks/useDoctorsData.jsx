import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { getDoctors } from "../api/doctorsApi";
import { useGetData } from "./useQueryBase";

export const useDoctors = () => {
  const { data, isLoading, isError } = useGetData(
    queryKeys.doctors,
    getDoctors,
  );

  return {
    doctors: data,
    isDoctorsLoading: isLoading,
    isDoctorsError: isError,
  };
};
