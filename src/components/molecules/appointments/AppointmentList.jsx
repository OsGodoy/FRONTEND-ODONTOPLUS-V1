import { useState, useEffect } from "react";
import { CirclePlus, CircleX, Search } from "lucide-react";
import { useAppointments } from "../../../hooks/useAppointmentsData";
import {
  DivContainerCenter,
  DivContainerGrid,
  DivContainerModal,
} from "../../atoms/DivContainer";
import ErrorPage from "../../atoms/ErrorPage";
import Loading from "../../atoms/Loading";
import { ButtonBorderBlue } from "../../atoms/Buttons";
import { Link } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";
import Input from "../../atoms/Input";
import AppointmentsListButtons from "./AppointmentsListButtons";
import { useSearch } from "../../../contexts/SearchContext";
import { hoverBgFx, scaleFx } from "../../../utils/styles";

const AppointmentsList = () => {
  const { searchTerm, setSearchTerm, showCancelled, handleClearSearch } =
    useSearch();
  const [inputValue, setInputValue] = useState(searchTerm);

  const { appointments, isLoading, isError } = useAppointments({
    search: searchTerm,
  });

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const filteredAppointments = showCancelled
    ? appointments?.filter((a) => a.status === "cancelled") || []
    : appointments?.filter((a) => a.status !== "cancelled") || [];

  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorPage />
      </div>
    );

  return (
    <DivContainerCenter className="text-white text-responsive-sm gap-2 h-full justify-start">
      <DivContainerCenter className="flex-col max-w-120">
        <DivContainerCenter className="flex-row gap-2">
          {!showCancelled && (
            <Link to="/new-appointment" className="flex-1">
              <DivContainerModal
                className={`gap-1 border border-blue-600 bg-blue-600/30 ${hoverBgFx("blue-600")}`}
              >
                <CirclePlus className="size-5 stroke-[1.5]" />
                Nueva
              </DivContainerModal>
            </Link>
          )}
          <DivContainerModal className="flex-2 text-white border border-blue-600">
            {showCancelled ? "Citas canceladas" : "Citas agendadas"}
          </DivContainerModal>
        </DivContainerCenter>

        <div className="flex md:hidden w-full items-center justify-between cursor-pointer text-xs mt-2">
          <AppointmentsListButtons />
        </div>

        <DivContainerCenter className="flex-col mt-2">
          <div className="relative w-full">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-full w-full"
              border="border-0"
              placeholder="Buscar..."
            />
            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 pr-3 h-full flex items-center justify-center"
            >
              <Search
                className={`${scaleFx("md")}
                  ${inputValue !== "" ? "text-orange-500 pointer-events-auto" : "text-slate-400 pointer-events-none"}
                `}
              />
            </button>
          </div>
          {searchTerm !== "" && (
            <div className="w-full mt-2 flex justify-start">
              <ButtonBorderBlue
                onClick={handleClearSearch}
                className="text-xs gap-1 rounded-full py-1"
              >
                Mostrar todas las citas
              </ButtonBorderBlue>
            </div>
          )}
        </DivContainerCenter>
      </DivContainerCenter>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <DivContainerGrid className="gap-2 overflow-y-auto w-full">
          {filteredAppointments.map((appoint) => (
            <AppointmentCard key={appoint.id} appoint={appoint} />
          ))}
        </DivContainerGrid>
      )}
    </DivContainerCenter>
  );
};

export default AppointmentsList;
