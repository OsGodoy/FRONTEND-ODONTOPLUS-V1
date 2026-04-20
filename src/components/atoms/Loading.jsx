import { LoaderCircle } from "lucide-react";
import { DivContainerCenter } from "./DivContainer";

const Loading = ({ size = "size-6", children = "cargando" }) => {
  return (
    <DivContainerCenter className="text-white">
      <LoaderCircle
        className={`animate-spin [animation-duration:1s] ${size}`}
      />
      <p>{children}</p>
    </DivContainerCenter>
  );
};

export default Loading;
