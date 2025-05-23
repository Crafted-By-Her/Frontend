import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  BellIcon,
  CogIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

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

    window.addEventListener('userProfileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">CraftedByHer</span>
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-md">
              {user?.role}
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative ml-3" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    {user?.firstName  + user?.lastName|| user?.email || "Admin"}
                  </span>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName || user?.email || "Admin"}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user?.email || "Administrator"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 border-t"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-4 w-4 inline mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;