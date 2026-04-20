import { useForm } from "react-hook-form";
import { DivContainerCenter } from "../atoms/DivContainer";
import Input from "../atoms/Input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { scaleFx } from "../../utils/styles";

const AuthForm = ({ type = "login", onSubmit }) => {
  const isRegister = type === "register";
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const errorStyle =
    "flex items-center justify-end w-full gap-1 text-rose-300 text-responsive-xs font-light mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      {isRegister && (
        <DivContainerCenter>
          <Input
            type="text"
            placeholder="Nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name ? (
            <span className={`${errorStyle}`}>{errors.name.message}</span>
          ) : (
            <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
              ghost
            </span>
          )}
        </DivContainerCenter>
      )}

      <DivContainerCenter>
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "El email es obligatorio",
          })}
        />
        {errors.email ? (
          <span className={`${errorStyle}`}>{errors.email.message}</span>
        ) : (
          <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
            ghost
          </span>
        )}
      </DivContainerCenter>

      <DivContainerCenter>
        <DivContainerCenter className="flex-row gap-2">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
            className="flex-2"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="bg-white text-blue-900 py-2 px-3 rounded cursor-pointer"
          >
            {showPass ? <EyeClosed /> : <Eye />}
          </button>
        </DivContainerCenter>
        {errors.password ? (
          <span className={`${errorStyle}`}>{errors.password.message}</span>
        ) : (
          <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
            ghost
          </span>
        )}
      </DivContainerCenter>

      {isRegister && (
        <DivContainerCenter>
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword ? (
            <span className={`${errorStyle}`}>
              {errors.confirmPassword.message}
            </span>
          ) : (
            <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
              ghost
            </span>
          )}
        </DivContainerCenter>
      )}

      <button
        type="submit"
        className={`font-semibold py-2 rounded text-white bg-orange-500 ${scaleFx("sm")}`}
      >
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default AuthForm;
