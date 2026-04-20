import { twMerge } from "tailwind-merge";

export const DivContainerCenter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerBetween = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex items-center justify-between w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerStart = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col items-start justify-center w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerEnd = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col items-center justify-end w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerGrid = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`grid gap-2 xl:gap-4 place-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full max-w-80 sm:max-w-160 md:max-w-200 xl:max-w-6xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerModal = ({ children, className = "", ...props }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center p-4 w-full rounded-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerFloat = ({ children, className = "", ...props }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center p-4 bg-neutral-950 border rounded-xl border-neutral-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
