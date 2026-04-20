import clsx from "clsx";

export const scaleFx = (size = "sm") =>
  clsx("cursor-pointer transition-transform duration-150", {
    "hover:scale-102": size === "xs",
    "hover:scale-105": size === "sm",
    "hover:scale-110": size === "md",
  });

export const bgVariants = {
  "neutral-700": "hover:bg-neutral-700",
  "emerald-500": "hover:bg-emerald-500",
  "red-500": "hover:bg-red-500",
  "blue-600": "hover:bg-blue-600/50",
};

export const hoverBgFx = (variant = "neutral-700") =>
  clsx("cursor-pointer transition-colors duration-150", bgVariants[variant]);

export const hideNativeIcon = `pr-10
  [&::-webkit-calendar-picker-indicator]:opacity-0
  [&::-webkit-calendar-picker-indicator]:absolute
  [&::-webkit-calendar-picker-indicator]:right-2
  [&::-webkit-calendar-picker-indicator]:w-6
  [&::-webkit-calendar-picker-indicator]:h-full
  [&::-webkit-calendar-picker-indicator]:cursor-pointer`;
