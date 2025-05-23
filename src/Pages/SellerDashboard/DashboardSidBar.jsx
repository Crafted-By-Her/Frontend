import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserCircleIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const DashboardSidBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = () => {
      const storedUser =
        JSON.parse(localStorage.getItem("userData")) ||
        JSON.parse(sessionStorage.getItem("userData"));
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUserData();
    const handleProfileUpdate = (e) => {
      setUser(e.detail);
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      name: "Account",
      path: "/seller-dashboard/account",
      icon: UserCircleIcon,
    },
    {
      name: "Product",
      path: "/seller-dashboard/product",
      icon: BuildingStorefrontIcon,
    },
    {
      name: "Review & Rate Report",
      path: "/seller-dashboard/review",
      icon: ChartBarIcon,
    },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow rounded-md"
        onClick={toggleSidebar}
      >
        <Bars3Icon className="w-6 h-6 text-gray-800" />
      </button>

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 z-50 transform ${
          isOpen ? "translate-x-0 bg-white" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out px-6 py-6 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center border rounded-md px-3 py-1 space-x-3 mb-8">
            {user?.profilePhoto ? (
              <img
                src={
                  user.profilePhoto.startsWith("http") ||
                  user.profilePhoto.startsWith("/")
                    ? user.profilePhoto
                    : `${import.meta.env.VITE_BACKEND_URL || ""}${
                        user.profilePhoto
                      }`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user?.firstName, user?.lastName)}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
              </p>
            </div>
          </div>
          <nav className="space-y-4">
            {menuItems.map(({ name, path, icon: Icon }) => {
              const isActive =
                location.pathname === path ||
                (path === "/seller-dashboard/account" &&
                  location.pathname === "/seller-dashboard");

              return (
                <Link
                  to={path}
                  key={name}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                    isActive
                     ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default DashboardSidBar;
