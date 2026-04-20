import { Link, useLocation } from "react-router-dom";
import {
  ButtonBgBlue,
  ButtonBorderEmerald,
  ButtonBorderRose,
} from "../../atoms/Buttons";
import { BriefcaseMedical, Home } from "lucide-react";
import { useSearch } from "../../../contexts/SearchContext";
import { scaleFx } from "../../../utils/styles";

const AppointmentsListButtons = () => {
  const { showCancelled, setShowCancelled } = useSearch();
  const location = useLocation();

  const handleToggle = () => {
    setShowCancelled(!showCancelled);
  };

  const isDoctorsPage = location.pathname === "/doctors-list";

  const hiddenRoutes = [
    "/doctors-list",
    "/new-appointment",
    "/update-appointment",
  ];

  const isHiddenPage = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {!isHiddenPage && (
        <div onClick={handleToggle} className="cursor-pointer">
          {showCancelled ? (
            <ButtonBorderEmerald className="rounded-full md:bg-transparent md:underline md:border-0 px-2 py-1">
              Citas activas
            </ButtonBorderEmerald>
          ) : (
            <ButtonBorderRose className="rounded-full md:bg-transparent md:underline md:border-0 px-2 py-1">
              Citas canceladas
            </ButtonBorderRose>
          )}
        </div>
      )}

      {!isDoctorsPage ? (
        <Link to="/doctors-list">
          <ButtonBgBlue className="rounded-full md:bg-transparent md:underline md:border-0 px-3 py-1 gap-1">
            <BriefcaseMedical className="size-4" />
            Doctores
          </ButtonBgBlue>
        </Link>
      ) : (
        <Link to="/">
          <button
            className={`text-white flex items-center justify-center gap-1 underline px-3 py-1 ${scaleFx("sm")}`}
          >
            <span>
              <Home className="size-4.5 " />
            </span>
            Inicio
          </button>
        </Link>
      )}
    </>
  );
};

export default AppointmentsListButtons;
