export const statusConfig = (status) => {
  switch (status) {
    case "pending":
      return {
        label: "Pendiente",
        className: "bg-yellow-500",
      };
    case "confirmed":
      return {
        label: "Confirmada",
        className: "bg-emerald-600 text-white",
      };
    case "cancelled":
      return {
        label: "Cancelada",
        className: "bg-rose-600 text-white",
      };
    default:
      return {
        label: status,
        className: "bg-gray-500 text-white",
      };
  }
};
