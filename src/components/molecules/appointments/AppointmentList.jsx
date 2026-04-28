import { useState, useEffect } from "react";
import {
  CirclePlus,
  Search,
  ArrowUpAZ,
  ArrowDownZA,
  CircleX,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import { useGetAppointments } from "../../../hooks/useAppointmentsData";
import {
  DivContainerCenter,
  DivContainerEnd,
  DivContainerGrid,
  DivContainerModal,
} from "../../atoms/DivContainer";
import ErrorPage from "../../atoms/ErrorPage";
import Loading from "../../atoms/Loading";
import {
  ButtonBorderAmber,
  ButtonBorderBlue,
  ButtonBorderOrange,
  ButtonBorderRose,
  ButtonSearch,
  ButtonSearchCancel,
} from "../../atoms/Buttons";
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

  const [sortOrder, setSortOrder] = useState("recent");

  const {
    appointments,
    isAppointmentsLoading,
    isAppointmentsError,
    isAppointmentsFetching,
  } = useGetAppointments({
    search: searchTerm,
    status: showCancelled ? "cancelled" : undefined,
    sort: sortOrder,
  });

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"));
  };

  if (isAppointmentsError)
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

        <div className="flex md:hidden w-full items-center justify-around cursor-pointer text-xs mt-2">
          <AppointmentsListButtons />
        </div>

        <DivContainerCenter className="flex-col mt-2">
          <DivContainerCenter>
            <DivContainerCenter className="flex-row w-full">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="rounded-l-full w-full"
                border="border-0"
                placeholder="Buscar..."
              />
              {searchTerm !== "" ? (
                <ButtonSearchCancel onClick={handleClearSearch}>
                  <CircleX className={`${scaleFx("md")}`} />
                </ButtonSearchCancel>
              ) : (
                <ButtonSearch
                  isActive={inputValue !== ""}
                  onClick={handleSearch}
                />
              )}
            </DivContainerCenter>
          </DivContainerCenter>

          {/* BOTÓN "MÁS RECIENTES" */}
          <DivContainerEnd className="my-2">
            <button
              onClick={toggleSort}
              title={
                sortOrder === "recent"
                  ? "Ver más antiguas"
                  : "Ver más recientes"
              }
              className="flex text-xs hover:text-blue-400 cursor-pointer"
            >
              Ordernadas por:
              {sortOrder === "recent" ? (
                <div className="flex items-center gap-1 px-1">
                  <span>Más recientes</span>
                  <CalendarArrowDown className="size-4" />
                </div>
              ) : (
                <div className="flex items-center gap-1 px-1">
                  <span>Más antiguas</span>
                  <CalendarArrowUp className="size-4" />
                </div>
              )}
            </button>
          </DivContainerEnd>
        </DivContainerCenter>
      </DivContainerCenter>

      {isAppointmentsFetching && searchTerm !== "" ? (
        <DivContainerCenter className="h-full">
          <Loading children="Buscando..." />
        </DivContainerCenter>
      ) : (
        <>
          {isAppointmentsLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loading />
            </div>
          ) : appointments && appointments.length > 0 ? (
            <DivContainerGrid className="gap-2 overflow-y-auto w-full">
              {appointments.map((appoint) => (
                <AppointmentCard key={appoint.id} appoint={appoint} />
              ))}
            </DivContainerGrid>
          ) : (
            <DivContainerCenter className="h-full text-center">
              Lista vacía...
            </DivContainerCenter>
          )}
        </>
      )}
    </DivContainerCenter>
  );
};

export default AppointmentsList;
