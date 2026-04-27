import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-2 md:right-10 z-40 p-2.5 rounded-full bg-orange-500 text-white shadow-lg transition-all duration-300 cursor-pointer ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
