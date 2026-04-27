import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseMedical,
  CircleQuestionMark,
  Clock,
  Info,
  LoaderCircle,
  OctagonX,
  SquarePen,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  DivContainerBetween,
  DivContainerCenter,
  DivContainerModal,
  DivContainerStart,
} from "../../atoms/DivContainer";
import { ButtonBorderWhite } from "../../atoms/Buttons";
import Loading from "../../atoms/Loading";
import { useUpdateStatus } from "../../../hooks/useAppointmentsData";
import { statusConfig } from "../../../utils/statusConfig";
import { scaleFx } from "../../../utils/styles";

const AppointmentCard = ({ appoint }) => {
  const [activeModal, setActiveModal] = useState(null);
  const { updateStatus, isUpdatingStatus } = useUpdateStatus();

  const isOpen = Boolean(activeModal);
  const status = statusConfig(appoint.status);
  const nextStatus = appoint.status === "pending" ? "confirmed" : "pending";
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES");
  };

  const handleStatusUpdate = async (targetStatus) => {
    try {
      await updateStatus({
        id: appoint.id,
        status: targetStatus,
      });
      setActiveModal(null);
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <DivContainerModal className="flex-col w-full bg-blue-950 relative">
      <DivContainerCenter className="flex-row">
        <DivContainerStart className="flex items-center justify-between w-full pb-2 gap-2">
          <h2 className="flex flex-col">
            Paciente:
            <span className="text-responsive-lg font-semibold">
              {appoint.patient.name}
            </span>
          </h2>
          <div className="flex gap-4 w-full">
            <h3 className="flex items-center border border-blue-600 p-2 rounded">
              {formatDate(appoint.date)}
            </h3>
            <h3 className="flex items-center border border-blue-600 p-2 rounded gap-1">
              <Clock className="size-4" />
              {appoint.start_time.slice(0, 5)} - {appoint.end_time.slice(0, 5)}
            </h3>
          </div>
          <h2 className="flex items-center justify-center gap-1">
            <BriefcaseMedical className="size-4 stroke-[1.5]" />
            {appoint.doctor.user.name}
          </h2>
        </DivContainerStart>

        {appoint.status !== "cancelled" && (
          <div className="flex flex-col pl-4 gap-4 self-start">
            <Link to={`update-appointment/${appoint.id}`}>
              <SquarePen className={`stroke-[1.5] ${scaleFx("md")}`} />
            </Link>
            <OctagonX
              onClick={() => setActiveModal("cancel")}
              className={`stroke-[1.5] rotate-90 cursor-pointer ${scaleFx("md")}`}
            />
          </div>
        )}
      </DivContainerCenter>

      <DivContainerBetween className="border-t border-blue-600 pt-2">
        <div
          onClick={() => setActiveModal("update")}
          className={`${status.className} p-2 rounded text-slate-800 font-semibold cursor-pointer ${scaleFx("xs")}
          ${appoint.status === "cancelled" ? "pointer-events-none" : "pointer-events-auto"}
          `}
        >
          <p className="min-w-20 flex justify-center">
            {isUpdatingStatus ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              status.label
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <button
            onClick={() => setActiveModal("details")}
            className="flex underline cursor-pointer hover:text-blue-400 transition-colors duration-75"
          >
            Ver detalles
            {appoint.notes?.trim() && (
              <Info className="size-3 text-amber-400 animate-bounce" />
            )}
          </button>
          <p className="text-xs text-blue-500">
            Creada el: {formatDate(appoint.created_at)}
          </p>
        </div>
      </DivContainerBetween>

      {/* MODAL OVERLAY */}
      <DivContainerCenter
        className={`absolute h-full p-1 transition-all duration-300 z-10
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-0"}`}
      >
        <DivContainerModal
          className={`flex-col items-start h-full rounded-lg bg-blue-900 p-2 border-2 duration-300
            ${
              activeModal === "cancel"
                ? "border-rose-500"
                : activeModal === "update"
                  ? nextStatus === "confirmed"
                    ? "border-emerald-500"
                    : "border-yellow-500"
                  : "border-blue-600"
            }`}
        >
          {activeModal === "details" && (
            <>
              <h4 className="font-semibold underline mb-1">Detalles:</h4>
              <p className="h-full overflow-y-auto">{appoint.notes}</p>
              <div className="border-t border-blue-600 pt-2 mt-2 w-full flex justify-between items-center">
                <p className="text-sm">
                  Creada por: {appoint.created_by_user.name}
                </p>
                <X
                  onClick={() => setActiveModal(null)}
                  className="size-5 absolute right-2 top-2 cursor-pointer"
                />
              </div>
            </>
          )}

          {(activeModal === "cancel" || activeModal === "update") && (
            <DivContainerCenter className="rounded h-full gap-2 p-2">
              {isUpdatingStatus ? (
                <Loading>
                  {activeModal === "cancel"
                    ? "Cancelando..."
                    : "Actualizando..."}
                </Loading>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center text-responsive-lg">
                    {activeModal === "cancel" ? (
                      <TriangleAlert className="size-8" />
                    ) : (
                      <CircleQuestionMark className="size-8" />
                    )}
                    <div className="mt-2">
                      {activeModal === "cancel" ? (
                        <div className="flex flex-col items-center justify-center">
                          ¿Quiere cancelar esta cita?
                          <span className="text-xs font-light">
                            Las citas canceladas no aparecen en el listado
                            principal
                          </span>
                        </div>
                      ) : (
                        `¿Desea marcar la cita como ${nextStatus === "confirmed" ? "confirmada" : "pendiente"}?`
                      )}
                    </div>
                  </div>
                  <div className="flex items-center w-full gap-2">
                    <ButtonBorderWhite
                      onClick={() => setActiveModal(null)}
                      className="flex-1"
                    >
                      No
                    </ButtonBorderWhite>
                    <button
                      onClick={() =>
                        activeModal === "cancel"
                          ? handleStatusUpdate("cancelled")
                          : handleStatusUpdate(nextStatus)
                      }
                      className={`flex-1 p-2 rounded font-semibold ${scaleFx("sm")} ${
                        activeModal === "cancel"
                          ? "bg-rose-500 text-white"
                          : nextStatus === "confirmed"
                            ? "bg-emerald-500 text-slate-800"
                            : "bg-yellow-500 text-slate-800"
                      }`}
                    >
                      Sí
                    </button>
                  </div>
                </>
              )}
            </DivContainerCenter>
          )}
        </DivContainerModal>
      </DivContainerCenter>
    </DivContainerModal>
  );
};

export default AppointmentCard;
