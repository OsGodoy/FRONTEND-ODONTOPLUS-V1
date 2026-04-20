import { Link } from "react-router-dom";
import { useNavigationLoader } from "../../contexts/NavigationContext";

const LinkLoader = ({ className = "", to, children }) => {
  const { setLoading } = useNavigationLoader();

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <Link to={to} onClick={handleClick} className={`${className}`}>
      {children}
    </Link>
  );
};

export default LinkLoader;
