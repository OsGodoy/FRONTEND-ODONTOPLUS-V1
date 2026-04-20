import React, { forwardRef, useRef } from "react";
import { Calendar, Clock } from "lucide-react";
import { hideNativeIcon } from "../../../utils/styles";

const FormField = forwardRef(
  (
    {
      label,
      error,
      type = "text",
      errorStyle,
      ghostStyle,
      containerClass = "",
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef(null);

    const setRefs = (node) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const Icon = type === "date" ? Calendar : type === "time" ? Clock : null;

    return (
      <div className={`flex flex-col w-full ${containerClass}`}>
        {label && (
          <p className="self-start text-white text-xs pl-2 mb-1">{label}</p>
        )}

        <div className="relative flex items-center">
          <input
            ref={setRefs}
            type={type}
            className={`w-full p-2 rounded text-white border border-blue-600 bg-transparent outline-none ${hideNativeIcon}`}
            {...rest}
          />

          {Icon && (
            <div className="absolute right-3 text-orange-500 pointer-events-none">
              <Icon className="stroke-[1.5]" />
            </div>
          )}
        </div>

        {error ? (
          <span className={errorStyle}>{error.message}</span>
        ) : (
          <span className={ghostStyle}>&nbsp;</span>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
