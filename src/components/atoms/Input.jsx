const Input = ({
  className = "",
  bg = "bg-white",
  textColor = "text-blue-950",
  border = "border",
  placeholderColor = "placeholder-neutral-500",
  ...props
}) => {
  return (
    <input
      {...props}
      className={`w-full py-2 px-3 outline-0 invalid:text-rose-600 rounded transition-colors duration-300 ${border} ${bg} ${textColor} ${placeholderColor} ${className}`}
    />
  );
};
export default Input;
