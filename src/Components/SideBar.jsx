import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = () => {
      const storedUser =
        JSON.parse(localStorage.getItem("userData")) ||
        JSON.parse(sessionStorage.getItem("userData"));
      if (storedUser) {
        setUser(storedUser);
        if (storedUser.profilePhoto) {
          setProfileImage(storedUser.profilePhoto);
        }
      }
    };
  
    loadUserData();
  
    const handleProfileUpdate = (e) => {
      setUser(e.detail);
      if (e.detail.profilePhoto) {
        setProfileImage(e.detail.profilePhoto);
      } else {
        setProfileImage(null);
      }
    };
  
    window.addEventListener("userProfileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("userProfileUpdated", handleProfileUpdate);
    };
  }, []);
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const role = user?.role?.toLowerCase();

  const getMenuItems = () => {
    const userRole = user?.role?.toLowerCase() || 'admin';
    
    if (userRole === 'superadmin') {
      return [
        {
          name: "Dashboard",
          path: "/superadmin/dashboard",
          icon: Squares2X2Icon,
        },
        {
          name: "Product",
          path: "/superadmin/product",
          icon: BuildingStorefrontIcon,
        },
        {
          name: "Inactive Users",
          path: "/superadmin/users",
          icon: ChartBarIcon,
        },
        {
          name: "Profile",
          path: "/superadmin/profile",
          icon: UserIcon,
        },
      ];
    } else {
      return [
        {
          name: "Product",
          path: "/admin/product",
          icon: BuildingStorefrontIcon,
        },
        {
          name: "Inactive Users",
          path: "/admin/users",
          icon: ChartBarIcon,
        },
        {
          name: "Profile",
          path: "/admin/profile",
          icon: UserIcon,
        },
      ];
    }
  };
  
  const menuItems = getMenuItems();
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow rounded-md"
        onClick={toggleSidebar}
      >
        <Bars3Icon className="w-6 h-6 text-gray-800" />
      </button>

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-84 z-50 transform ${
          isOpen ? "translate-x-0 bg-white" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out px-6 py-6 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center border rounded-md px-3 py-2 space-x-3 mb-8">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <div className="border bg-gray-900 text-white rounded-full py-2 px-3">
                {getInitials(user?.firstName, user?.lastName)}
              </div>
            )}
            <p className="text-xs font-medium text-gray-800 capitalize">
              {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}
            </p>
          </div>
          <nav className="space-y-4">
            {menuItems.map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname === path;
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
                  <Icon
                    className={`h-5 w-5 mr-3 ${
                      isActive ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
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

export default Sidebar;
