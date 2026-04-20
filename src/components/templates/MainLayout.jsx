import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import ScrollToTopButton from "../../hooks/useScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-950">
      <Header />
      <main className="flex-1 flex w-full min-h-0 px-4">
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <Outlet />
        </div>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
