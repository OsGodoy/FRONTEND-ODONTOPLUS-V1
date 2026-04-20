import { ShieldPlus } from "lucide-react";
import {
  DivContainerCenter,
  DivContainerEnd,
  DivContainerStart,
} from "../atoms/DivContainer";
import { useAuth } from "../../hooks/useAuthData";
import { Link } from "react-router-dom";
import { ButtonBgOrange } from "../atoms/Buttons";
import AppointmentsListButtons from "../molecules/appointments/AppointmentsListButtons";

const Header = () => {
  return (
    <div className="sticky top-0 mb-3 w-full p-4 flex items-center justify-center bg-slate-900 z-40">
      <DivContainerCenter className="flex-row max-w-360 gap-2">
        <DivContainerStart className="flex-1">
          <Link
            to="/"
            className="flex items-center justify-start text-xl sm:text-2xl font-semibold text-white"
          >
            ODONTO
            <span className="flex items-center text-orange-500">
              <ShieldPlus className="size-6 sm:size-8" />
            </span>
          </Link>
        </DivContainerStart>

        <DivContainerEnd className="flex-row flex-1 md:flex-2 gap-2 text-neutral-500">
          <div className="hidden md:flex items-center justify-center">
            <AppointmentsListButtons />
          </div>

          <Link to={"/auth/login"}>
            <ButtonBgOrange className="text-responsive-xs">
              Iniciar Sesión
            </ButtonBgOrange>
          </Link>
        </DivContainerEnd>
      </DivContainerCenter>
    </div>
  );
};

export default Header;
