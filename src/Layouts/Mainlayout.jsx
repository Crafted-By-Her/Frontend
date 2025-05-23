import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import NavMenu from "../Components/NavMenu";
const MainLayout = () => {
  return (
    <>
    <Header/>
    <NavMenu/>
      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>
      </>
  );
};

export default MainLayout;
