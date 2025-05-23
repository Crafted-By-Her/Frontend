import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidBar from "../Components/SideBar";
import AdminNavbar from "../Components/AdminNavbar";
import { getUserRole } from "../utils/getUserRole"; 

const SuperAdminLayout = () => {
  const role = getUserRole();

  if (role !== "SUPERADMIN") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SidBar />
        <main className="flex-1 p-6 bg-gray-50 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
