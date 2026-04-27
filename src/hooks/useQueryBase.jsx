import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export const useGetData = (key, fetchFn, filters = {}, options = {}) => {
  const query = useQuery({
    queryKey: Array.isArray(key) ? [...key, filters] : [key, filters],
    queryFn: () => fetchFn(filters),
    staleTime: 1000 * 60 * 5,
    // Mantener la lista vieja mientras carga la nueva
    placeholderData: keepPreviousData,
    // Permitir sobrescribir cualquier config (staleTime, gcTime, etc.) desde el componente.
    ...options,
  });

  return {
    ...query,
    // Asegurar un array para evitar errores de .map()
    data: query.data ?? [],
  };
};

export const useGetDataById = (key, fetchFn, id, options = {}) => {
  const query = useQuery({
    queryKey: Array.isArray(key) ? [...key, id] : [key, id],
    queryFn: () => fetchFn(id),
    // No ejecuta la query si no hay ID
    enabled: !!id,
    ...options,
  });

  return {
    ...query,
    data: query.data ?? null,
  };
};

export const useMutationData = (keyToInvalidate, apiFn, options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiFn,
    onSuccess: async (data, variables, context) => {
      // Invalidar la lista principal
      const baseKey = Array.isArray(keyToInvalidate)
        ? keyToInvalidate
        : [keyToInvalidate];
      await queryClient.invalidateQueries({ queryKey: baseKey });

      // Invalidar el detalle específico
      let specificId = null;
      if (variables && typeof variables === "object") {
        // Buscar 'id' o cualquier llave que termine en 'Id'
        const idKey = Object.keys(variables).find(
          (k) => k === "id" || k.toLowerCase().endsWith("id"),
        );
        specificId = idKey ? variables[idKey] : null;
      } else if (
        typeof variables === "string" ||
        typeof variables === "number"
      ) {
        specificId = variables;
      }

      if (specificId) {
        await queryClient.invalidateQueries({
          queryKey: [...baseKey, specificId],
        });
      }

      // Ejecuta el callback del componente si existe
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (options.onError) options.onError(err, variables, context);
    },
    ...options,
  });

  return {
    ...mutation,
    // Uso general sin try/catch
    execute: mutation.mutate,
    // Por si el componente necesita 'await'
    executeAsync: mutation.mutateAsync,
  };
};
