import React from "react";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import Regsitration from "./Pages/Regsitartion";
import Home from "./Pages/Home";
import LearingVideo from "./Pages/LearingVideo";
import CategoryPage from "./Pages/CategoryPage";
import About from "./Pages/About";
import SellerDashboardLayout from "./Layouts/SellerDashboardLayout";
import DashboardPageRenderer from "./Pages/SellerDashboard/PageRenderer";
import AdminDashboardLayout from "./Layouts/AdminDashboardLayout";
import AdminPageRenderer from "./Pages/AdminDashboard/PageRender";
import SuperAdminPageRenderer from "./Pages/SAdminDashbored/PageRender";
import MainLayout from "./Layouts/Mainlayout";
import ProductDetailPage from "./Components/ProductDetailPage";
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import { Toaster } from "react-hot-toast";
import ContactPage from "./Pages/ContactUs";
import TermsAndConditions from "./Pages/TermsConditions";
import FAQPage from "./Pages/FAqPage";
function App() {
  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/registration" element={<Regsitration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/learningvideo" element={<LearingVideo />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/terms" element={<TermsAndConditions/>} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route
            path="/products/:categoryName/:productId"
            element={<ProductDetailPage />}
          />
        </Route>
        <Route
          path="/seller-dashboard"
          element={
              <SellerDashboardLayout />
          }
        >
          <Route index element={<DashboardPageRenderer />} />
          <Route path=":page" element={<DashboardPageRenderer />} />
        </Route>

        <Route
          path="/admin"
          element={       
              <AdminDashboardLayout />
          }
        >
          <Route index element={<AdminPageRenderer />} />
          <Route path=":page" element={<AdminPageRenderer />} />
        </Route>

        <Route
          path="/superadmin"
          element={
              <SuperAdminLayout />
          }
        >
          <Route index element={<SuperAdminPageRenderer />} />
          <Route path=":page" element={<SuperAdminPageRenderer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
