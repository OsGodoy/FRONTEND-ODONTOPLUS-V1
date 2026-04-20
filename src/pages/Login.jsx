import { Link, Navigate } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AuthForm from "../components/molecules/AuthForm";
import { Home, IdCard, ShieldPlus } from "lucide-react";
import { ButtonBgBlue, ButtonBorderWhite } from "../components/atoms/Buttons";
import { useAuth, useLogin } from "../hooks/useAuthData";
import Loading from "../components/atoms/Loading";
import { scaleFx } from "../utils/styles";

const LoginPage = () => {
  const { mutate, isPending, isError } = useLogin();
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleLogin = (formData) => {
    mutate(formData);
  };

  if (isLoading) return <Loading />;

  if (isPending) return <Loading children="Iniciando sesión" />;

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <DivContainerCenter className="relative max-w-360 h-full">
      <Link to="/" className="absolute top-4 left-0">
        <button
          className={`text-white text-xs flex items-center justify-center gap-1 underline ${scaleFx("sm")}`}
        >
          Volver al inicio
          <span>
            <Home className="stroke-[1.5] size-5" />
          </span>
        </button>
      </Link>
      <DivContainerCenter>
        <Link
          to="/"
          className="flex items-center justify-center w-full text-responsive-4xl font-bold text-white py-6"
        >
          ODONTO{" "}
          <span className="text-orange-500 flex items-center justify-center">
            <ShieldPlus className="size-10 stroke-[2.5]" />
          </span>
        </Link>
      </DivContainerCenter>
      <DivContainerModal className="flex-col py-5 max-w-80 lg:max-w-90 bg-blue-950">
        <h2 className="text-responsive-xl mb-5 text-white">
          Ingrese sus credenciales
        </h2>
        <AuthForm type="login" onSubmit={handleLogin} />
        <DivContainerCenter className="mt-4 gap-3 border-t border-blue-600 pt-4">
          <div className="text-responsive-sm">
            <ButtonBgBlue className="font-semibold gap-1 py-1">
              Crear credencial
              <span>
                <IdCard className="size-8 stroke-1" />
              </span>
            </ButtonBgBlue>
          </div>
        </DivContainerCenter>
      </DivContainerModal>
    </DivContainerCenter>
  );
};

export default LoginPage;
