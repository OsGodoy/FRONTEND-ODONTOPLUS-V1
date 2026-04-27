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

  const { appointments, isAppointmentsLoading, isAppointmentsError } =
    useGetAppointments({
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
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="rounded-full w-full"
                border="border-0"
                placeholder="Buscar..."
              />
              {searchTerm !== "" ? (
                <button
                  onClick={handleClearSearch}
                  className="absolute top-0 right-0 pr-2 h-full"
                >
                  <CircleX
                    className={`${scaleFx("md")} text-orange-500 stroke-[1.5] cursor-pointer`}
                  />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  className="absolute top-0 right-0 pr-3 h-full"
                >
                  <Search
                    className={`${scaleFx("md")}
                    ${inputValue !== "" ? "text-orange-500 pointer-events-auto cursor-pointer" : "text-slate-400 pointer-events-none"}
                    `}
                  />
                </button>
              )}
            </div>
          </div>

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

      {isAppointmentsLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <DivContainerGrid className="gap-2 overflow-y-auto w-full">
          {appointments && appointments.length > 0 ? (
            appointments.map((appoint) => (
              <AppointmentCard key={appoint.id} appoint={appoint} />
            ))
          ) : (
            <div className="w-full text-center py-20 opacity-40 italic">
              No hay citas para mostrar
            </div>
          )}
        </DivContainerGrid>
      )}
    </DivContainerCenter>
  );
};

export default AppointmentsList;
