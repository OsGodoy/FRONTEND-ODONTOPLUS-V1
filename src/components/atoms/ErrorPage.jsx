import { ServerCrash } from "lucide-react";
import { DivContainerCenter } from "./DivContainer";

const ErrorPage = () => {
  return (
    <DivContainerCenter className="text-white">
      <ServerCrash />
      <p>Ups, algo salió mal...</p>
      <p>Intenta más tarde</p>
    </DivContainerCenter>
  );
};

export default ErrorPage;
