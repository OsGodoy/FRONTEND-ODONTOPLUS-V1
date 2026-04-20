const Card = ({ children, className = "", variant }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full bg-neutral-900 border border-neutral-700 ${className}
      ${variant === "carousel" ? "h-80 rounded-lg" : "h-120 rounded-xl"}
      `}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center flex-5 p-3 w-full border-b border-neutral-800 ${className}`}
    >
      {children}
    </div>
  );
};

Card.Content = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col flex-1 px-3 py-2 w-full ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className = "" }) => {
  return (
    <div
      className={`flex items-center flex-col flex-1 p-3 w-full border-t border-neutral-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
