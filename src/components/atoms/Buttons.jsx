import { Search } from "lucide-react";
import { scaleFx } from "../../utils/styles";

export const ButtonBorderAmber = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-amber-400/90 border border-amber-400/90 rounded bg-amber-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderOrange = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-orange-400/90 border border-orange-400/90 rounded bg-orange-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderWhite = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`flex items-center justify-center text-white border border-blue-100 rounded p-2 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBgBlue = ({
  children,
  className = "",
  padding = "p-2",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center text-white bg-blue-600 rounded ${padding} ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBgEmerald = ({
  children,
  className = "",
  padding = "p-2",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center text-white bg-emerald-500 rounded ${padding} ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBgRose = ({
  children,
  className = "",
  padding = "p-2",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center text-white bg-rose-500 rounded ${padding} ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderBlue = ({
  children,
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center border border-blue-600 rounded p-2 ${textColor} ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBgOrange = ({
  children,
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center bg-orange-500 rounded p-2 ${textColor} ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderNeutral = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderEmerald = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`text-emerald-400/90 border border-emerald-400/90 rounded bg-emerald-400/10 p-1 ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonCart = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 w-5 h-5 lg:w-6 lg:h-6 text-responsive-sm flex items-center justify-center ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderRose = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`text-rose-400/90 border border-rose-400/90 rounded bg-rose-400/10 p-1 ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonCarousel = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`border border-neutral-700 bg-neutral-900/80 p-2 rounded-full ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonSearch = ({
  isActive = false,
  onClick,
  className = "",
  ...props
}) => {
  const stateClasses = isActive
    ? "bg-emerald-500 text-white pointer-events-auto cursor-pointer"
    : "bg-white border-l border-mist-300 text-mist-400 pointer-events-none";

  return (
    <button
      onClick={onClick}
      className={`px-2 h-full rounded-r-full ${stateClasses} ${className}`}
      {...props}
    >
      <Search className={scaleFx("md")} />
    </button>
  );
};

export const ButtonSearchCancel = ({
  children,
  className = "",
  onClick,
  bgColor = "bg-rose-400",
  textColor = "text-white",
  ...props
}) => {
  return (
    <button
      className={`px-2 h-full rounded-r-full pointer-events-auto cursor-pointer ${className} ${bgColor} ${textColor}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
