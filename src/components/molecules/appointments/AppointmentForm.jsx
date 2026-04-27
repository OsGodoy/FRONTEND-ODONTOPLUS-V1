import { useForm } from "react-hook-form";
import { DivContainerCenter } from "../../atoms/DivContainer";
import Input from "../../atoms/Input";
import Loading from "../../atoms/Loading";
import { UserRoundPlus } from "lucide-react";
import { ButtonBgOrange, ButtonBorderWhite } from "../../atoms/Buttons";
import { Link } from "react-router-dom";
import { useAvailableDoctors } from "../../../hooks/useAvailabilityData";
import FormDropDown from "../formParts/FormDropDown";
import FormField from "../formParts/FormField";
import { useEffect } from "react";

const AppointmentForm = ({
  type = "create",
  onSubmit,
  isCreating,
  loadingPatients,
  errorPatients,
  initialData = {},
  patients = [],
}) => {
  const isEdit = type === "update";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData]);

  const [watchDate, watchStart, watchEnd] = watch([
    "date",
    "start_time",
    "end_time",
  ]);

  const shouldFetch = watchDate && watchStart && watchEnd;

  const { availableDoctors, isAvailablesLoading, isAvailablesError } =
    useAvailableDoctors(
      shouldFetch
        ? {
            date: watchDate,
            start_time: watchStart,
            end_time: watchEnd,
          }
        : null,
    );

  const finalDoctors = [...(availableDoctors || [])];

  if (isEdit && initialData?.doctor_id && initialData?.doctor) {
    const isAlreadyInList = finalDoctors.some(
      (doc) => doc.id === initialData.doctor_id,
    );

    if (!isAlreadyInList) {
      finalDoctors.push(initialData.doctor);
    }
  }

  const selectStyle =
    "w-full p-2 rounded bg-transparent text-white border border-blue-600 focus:outline-none flex items-center justify-between min-h-[40px]";

  const errorStyle =
    "flex items-center justify-end w-full gap-1 text-rose-300 text-responsive-xs font-light mt-1";

  const ghostStyle =
    "text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1";

  useEffect(() => {
    register("patient_id", { required: "Selecciona un paciente" });
    register("doctor_id", { required: "Selecciona un doctor" });
  }, [register]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      {/* Dropdown de Pacientes */}
      <DivContainerCenter>
        <FormDropDown
          name="patient_id"
          value={watch("patient_id") || ""}
          onChange={(e) => {
            setValue("patient_id", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          options={patients}
          loading={loadingPatients}
          error={errorPatients}
          placeholder="Seleccionar Paciente..."
          loadingText="Cargando pacientes..."
          errorMessage={errors.patient_id?.message}
          icon={UserRoundPlus}
          onIconClick={() => console.log("Abrir modal de nuevo paciente")}
          selectStyle={selectStyle}
          errorStyle={errorStyle}
          ghostStyle={ghostStyle}
        />
      </DivContainerCenter>

      {/* Fecha */}
      <DivContainerCenter>
        <FormField
          type="date"
          error={errors.date}
          errorStyle={errorStyle}
          ghostStyle={ghostStyle}
          {...register("date", { required: "La fecha es obligatoria" })}
        />
      </DivContainerCenter>

      {/* Horas (Start and End) */}
      <div className="flex gap-2 w-full">
        <DivContainerCenter className="flex-1">
          <FormField
            label="Inicio"
            type="time"
            error={errors.start_time}
            errorStyle={errorStyle}
            ghostStyle={ghostStyle}
            {...register("start_time", { required: "Requerido" })}
          />
        </DivContainerCenter>

        <DivContainerCenter className="flex-1">
          <FormField
            label="Fin"
            type="time"
            error={errors.end_time}
            errorStyle={errorStyle}
            ghostStyle={ghostStyle}
            {...register("end_time", {
              required: "Requerido",
              validate: (value) => {
                if (!watchStart) return true;
                return value > watchStart || "Hora inválida";
              },
            })}
          />
        </DivContainerCenter>
      </div>

      {/* Dropdown de Doctores */}
      <DivContainerCenter>
        <FormDropDown
          name="doctor_id"
          value={watch("doctor_id") || ""}
          onChange={(e) => {
            setValue("doctor_id", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          options={finalDoctors}
          loading={isAvailablesLoading}
          error={isAvailablesError}
          disabled={!watchDate || !watchStart || !watchEnd}
          placeholder={
            !watchDate || !watchStart || !watchEnd
              ? "Primero elige fecha y horario"
              : finalDoctors?.length > 0
                ? "Seleccionar Doctor..."
                : "No hay doctores disponibles"
          }
          loadingText="Buscando doctores disponibles..."
          errorMessage={errors.doctor_id?.message}
          selectStyle={selectStyle}
          errorStyle={errorStyle}
          ghostStyle={ghostStyle}
        />
      </DivContainerCenter>

      {/* Notas */}
      <DivContainerCenter>
        <Input
          type="text"
          placeholder="Notas adicionales"
          {...register("notes")}
          bg="bg-transparent"
          placeholderColor="placeholder:text-white/50"
          className="border border-blue-600 text-white"
        />
        <span className={`${ghostStyle}`}>ghost</span>
      </DivContainerCenter>

      <div className="w-full flex items-center justify-center gap-4">
        <Link to="/" className="flex-1">
          <ButtonBorderWhite type="button" className="w-full">
            Cancelar
          </ButtonBorderWhite>
        </Link>
        <ButtonBgOrange type="submit" className="flex-2">
          {isCreating ? (
            <Loading children="" />
          ) : isEdit ? (
            "Actualizar Cita"
          ) : (
            "Crear Cita"
          )}
        </ButtonBgOrange>
      </div>
    </form>
  );
};

export default AppointmentForm;
