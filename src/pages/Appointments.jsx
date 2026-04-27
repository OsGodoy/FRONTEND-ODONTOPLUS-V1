import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AppointmentForm from "../components/molecules/appointments/AppointmentForm";
import {
  useCreateAppointment,
  useUpdateAppointment,
  useGetAppointments,
} from "../hooks/useAppointmentsData";
import { usePatients } from "../hooks/usePatientsData";

const Appointments = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { appointments } = useGetAppointments();

  const { createAppointment, isCreating } = useCreateAppointment();
  const { updateAppointmentAsync, isUpdating } = useUpdateAppointment();

  const { patients, isPatientsLoading, isPatientsError } = usePatients();

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
        ? updateAppointmentAsync({ id, ...payload })
        : createAppointment(payload);

      await promise;

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Error:", error.message);
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
          isPatientsLoading={isCreating || isUpdating}
          patients={patients}
          loadingPatients={isPatientsLoading}
          errorPatients={isPatientsError}
        />
      </DivContainerModal>
    </DivContainerCenter>
  );
};

export default Appointments;
