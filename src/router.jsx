import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./components/templates/MainLayout";
import HomePage from "./pages/Home";
import AuthLayout from "./components/templates/AuthLayout";
import LoginPage from "./pages/Login";
import Appointments from "./pages/Appointments";
import DoctorsList from "./components/molecules/doctors/DoctorsList";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "new-appointment", element: <Appointments /> },
          { path: "update-appointment/:id", element: <Appointments /> },
          { path: "doctors-list", element: <DoctorsList /> },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
