// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
