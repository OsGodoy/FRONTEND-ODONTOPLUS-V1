import { twMerge } from "tailwind-merge";

export const UlContainerCenter = ({ children, className = "", ...props }) => {
  return (
    <ul
      className={`flex flex-col items-start justify-center gap-1 ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
};

export const LiContainer = ({ children, className = "", ...props }) => {
  return (
    <li
      className={twMerge("items-center justify-between p-4 w-full", className)}
      {...props}
    >
      {children}
    </li>
  );
};

export const UlContainerGrid = ({ children, className = "", ...props }) => {
  return (
    <ul
      className={`grid grid-cols-3 items-center place-items-center gap-1 ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
};
