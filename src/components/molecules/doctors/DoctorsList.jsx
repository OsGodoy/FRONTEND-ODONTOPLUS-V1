import { BriefcaseMedical, Home, Mail } from "lucide-react";
import { useDoctors } from "../../../hooks/useDoctorsData";
import {
  DivContainerCenter,
  DivContainerEnd,
  DivContainerGrid,
  DivContainerModal,
} from "../../atoms/DivContainer";
import ErrorPage from "../../atoms/ErrorPage";
import Loading from "../../atoms/Loading";
import { LiContainer, UlContainerCenter } from "../../atoms/UlContainer";
import { ButtonBorderRose, ButtonBorderWhite } from "../../atoms/Buttons";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const { doctors, isDoctorsLoading, isDoctorsError } = useDoctors();

  const getDayName = (day) => {
    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    return days[day - 1] || "Día no definido";
  };

  const formatTime = (time) => time.slice(0, 5);

  if (isDoctorsError) {
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorPage />
      </div>
    );
  }

  const getGroupedAvailability = (availability) => {
    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];

    const grouped = availability.reduce((acc, curr) => {
      const dayName = days[curr.day_of_week - 1];
      if (!acc[dayName]) acc[dayName] = [];

      acc[dayName].push(
        `${curr.start_time.slice(0, 5)} - ${curr.end_time.slice(0, 5)}`,
      );
      return acc;
    }, {});

    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => a.localeCompare(b));
    });

    const sortedDays = Object.keys(grouped).sort(
      (a, b) => days.indexOf(a) - days.indexOf(b),
    );

    return { grouped, sortedDays };
  };

  return (
    <DivContainerCenter className="text-white text-responsive-sm gap-2 h-full justify-start">
      <Link to="/" className="self-start md:hidden">
        <button className="text-white text-xs flex items-center justify-center gap-1 underline">
          Volver al inicio
          <span>
            <Home className="stroke-[1.5] size-5" />
          </span>
        </button>
      </Link>

      <DivContainerCenter className="flex-col max-w-140">
        <DivContainerModal className="text-white border border-blue-600 px-3 py-0">
          <DivContainerModal>Listado de Doctores</DivContainerModal>
        </DivContainerModal>
      </DivContainerCenter>

      {isDoctorsLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : doctors.length === 0 ? (
        <DivContainerModal className="h-full border border-blue-600">
          <p>No hay doctores...</p>
        </DivContainerModal>
      ) : (
        <DivContainerGrid>
          {doctors.map((doc) => {
            return (
              <DivContainerModal
                key={doc.id}
                className="flex-col bg-blue-950 my-1 p-2 md:p-3"
              >
                <DivContainerCenter className="flex-row">
                  <h2 className="flex-2 font-bold text-responsive-lg flex items-center justify-start gap-1 w-full">
                    <span>
                      <BriefcaseMedical className="stroke-[1.5] text-orange-500" />
                    </span>
                    {doc.user.name}
                  </h2>
                  <DivContainerEnd className="flex-1 flex-row italic text-responsive-xs">
                    <span className="border border-blue-600 rounded p-1">
                      {doc.specialty}
                    </span>
                  </DivContainerEnd>
                </DivContainerCenter>
                <div className="flex items-center justify-end w-full pt-2 gap-1">
                  {doc.user.email}
                  <Mail className="size-4" />
                </div>
                <h3 className="mt-2 ml-3 self-start bg-blue-900/60 px-3 py-1 rounded-t">
                  Agenda semanal:
                </h3>
                <DivContainerModal className="flex-col bg-blue-900 rounded p-3 gap-2">
                  {(() => {
                    const { grouped, sortedDays } = getGroupedAvailability(
                      doc.availability,
                    );

                    return sortedDays.map((day) => (
                      <div
                        key={day}
                        className="flex flex-col pb-2 last:pb-0 w-full max-w-80"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-semibold text-white text-xs uppercase tracking-wider">
                            {day}
                          </span>
                          <div className="space-x-2">
                            {grouped[day].map((interval, idx) => (
                              <span
                                key={idx}
                                className="text-white text-sm bg-blue-950 px-2 rounded"
                              >
                                {interval}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </DivContainerModal>
              </DivContainerModal>
            );
          })}
        </DivContainerGrid>
      )}
    </DivContainerCenter>
  );
};

export default DoctorsList;
