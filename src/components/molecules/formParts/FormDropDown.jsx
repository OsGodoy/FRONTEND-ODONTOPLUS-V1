import React, { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Loading from "../../atoms/Loading";
import { useOnClickOutside } from "../../../hooks/useClickOutside";
import { scaleFx } from "../../../utils/styles";

const FormDropDown = forwardRef(
  (
    {
      label,
      name,
      options = [],
      loading = false,
      error = null,
      errorMessage = "",
      loadingText = "Cargando...",
      errorText = "Error al cargar datos",
      placeholder = "Seleccionar...",
      disabled = false,
      value,
      onChange,
      icon: Icon,
      onIconClick,
      selectStyle = "border p-2 rounded bg-white",
      errorStyle = "text-red-500 text-sm",
      ghostStyle = "invisible text-sm",
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const containerRef = useRef(null);

    useOnClickOutside(containerRef, () => setIsOpen(false));

    useEffect(() => {
      const option = options.find((opt) => opt.id === value);
      if (option) {
        setSelectedLabel(option.name || option.user?.name);
      } else {
        setSelectedLabel("");
      }
    }, [value, options]);

    const handleSelect = (option) => {
      if (disabled || loading) return;

      if (onChange) {
        onChange({ target: { name, value: option.id } });
      }
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col w-full" ref={containerRef}>
        <div className="w-full flex items-center gap-2">
          <div className="relative grow">
            <div
              onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
              className={`flex items-center justify-between cursor-pointer ${selectStyle} ${
                disabled || loading ? "cursor-not-allowed" : ""
              }`}
            >
              <span
                className={`${!selectedLabel ? "text-white" : ""} truncate`}
              >
                {loading ? (
                  <span className="flex gap-1">
                    <Loading children="" size="size-4" />
                    {loadingText}
                  </span>
                ) : error ? (
                  errorText
                ) : (
                  selectedLabel || placeholder
                )}
              </span>

              <ChevronDown
                className={`size-5 transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-180" : "rotate-0"
                } text-blue-600`}
              />
            </div>

            {/* Menú desplegable */}

            <ul
              className={`absolute z-50 w-full mt-1 bg-white border border-slate-500 rounded shadow-lg max-h-40 overflow-auto transition-all duration-300 ease-in-out origin-top transform ${
                isOpen && !loading && !error
                  ? "opacity-100 scale-y-100 visible"
                  : "opacity-0 scale-y-0 invisible"
              }`}
            >
              <li
                onClick={() => handleSelect({ id: "" })}
                className="px-4 py-2 cursor-pointer text-gray-400"
              >
                {placeholder}
              </li>
              {options.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors"
                >
                  {opt.name || opt.user?.name}
                </li>
              ))}
            </ul>

            {/* Input oculto */}
            <input
              type="hidden"
              name={name}
              ref={ref}
              value={value || ""}
              {...rest}
            />
          </div>

          {/* Botón lateral opcional */}
          {Icon && (
            <button
              type="button"
              onClick={onIconClick}
              className={`bg-orange-500 py-2 px-3 rounded text-white ${scaleFx("sm")}`}
            >
              <Icon />
            </button>
          )}
        </div>

        {/* Mensajes de error */}
        {errorMessage ? (
          <span className={errorStyle}>{errorMessage}</span>
        ) : (
          <span className={ghostStyle}>&nbsp;</span>
        )}
      </div>
    );
  },
);

FormDropDown.displayName = "FormDropDown";

export default FormDropDown;
