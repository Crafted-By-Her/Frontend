import React from 'react'
import { Outlet } from "react-router-dom";
import DashboardSidBar from '../Pages/SellerDashboard/DashboardSidBar';

import Header from '../Components/Header';
const SellerDashboardLayout = () => {
  return (
    <>
    <Header/>
    <div className="flex">
    <DashboardSidBar />
    <main className="flex-1 p-6 bg-gray-50">
      <Outlet />
    </main>
  </div>
  </>
  )
}
export default SellerDashboardLayout