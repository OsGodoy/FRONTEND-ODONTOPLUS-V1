import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AppointmentForm from "../components/molecules/appointments/AppointmentForm";
import { useAppointments } from "../hooks/useAppointmentsData";
import { usePatients } from "../hooks/usePatientsData";

const Appointments = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    createAppointment,
    updateAppointment,
    isCreating,
    isUpdating,
    appointments,
  } = useAppointments();
  const {
    patients,
    isLoading: loadingPatients,
    isError: errorPatients,
  } = usePatients();

  const appointmentToEdit =
    appointments?.find((app) => app.id === id) || location.state?.appointment;

  const formattedData = appointmentToEdit
    ? {
        ...appointmentToEdit,
        date: appointmentToEdit.date?.split("T")[0] || "",
      }
    : {};

  const isEditMode = Boolean(id);

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        notes: formData.notes ?? "",
      };

      const promise = isEditMode
        ? updateAppointment({ id, ...payload })
        : createAppointment(payload);

      toast.promise(promise, {
        loading: isEditMode ? "Actualizando cita..." : "Creando cita...",
        success: isEditMode
          ? "Cita actualizada correctamente"
          : "Cita creada correctamente",
        error: (err) => err?.response?.data?.message || "Hubo un error",
      });

      await promise;

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <DivContainerCenter className="relative max-w-120 gap-2 h-full justify-center">
      <DivContainerModal className="border border-blue-600 text-white">
        {isEditMode ? "Editar cita" : "Formulario para crear cita"}
      </DivContainerModal>

      <DivContainerModal className="flex-col bg-blue-950">
        <AppointmentForm
          type={isEditMode ? "update" : "create"}
          initialData={formattedData}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          patients={patients}
          loadingPatients={loadingPatients}
          errorPatients={errorPatients}
        />
      </DivContainerModal>
    </DivContainerCenter>
  );
};

export default Appointments;
