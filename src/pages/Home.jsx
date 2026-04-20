import { DivContainerCenter } from "../components/atoms/DivContainer";
import AppointmentsList from "../components/molecules/appointments/AppointmentList";

const HomePage = () => {
  return (
    <DivContainerCenter className="text-responsive-lg gap-2 h-full">
      <div className="w-full h-full flex items-center justify-center">
        <AppointmentsList />
      </div>
    </DivContainerCenter>
  );
};

export default HomePage;
