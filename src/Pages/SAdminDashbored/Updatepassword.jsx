import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const UpdatePasswordPage = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData = localStorage.getItem("userData") || sessionStorage.getItem("userData");

    if (token && userData) {
      setUserAuthenticated(true);
    } else {
      toast.error("Authentication required. Please log in.");
      setUserAuthenticated(false);
    }
  }, []);

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      toast.error("User is not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/api/admin/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.error("Failed to update password:", data);
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error during password update:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!userAuthenticated) {
    return (
      <div className="text-red-600 text-center mt-10">
        You must be logged in to access this page.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-xl">
      <h3 className="text-lg font-semibold mb-6">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {["current", "new", "confirm"].map((field) => {
          const label =
            field === "current"
              ? "Current Password"
              : field === "new"
              ? "New Password"
              : "Confirm Password";
          const name =
            field === "current"
              ? "currentPassword"
              : field === "new"
              ? "newPassword"
              : "confirmPassword";
          return (
            <div className="relative" key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={passwordVisibility[field] ? "text" : "password"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border p-3 pr-10 text-sm rounded w-full focus:outline-none focus:border-blue-500"
              />
              <div
                className="absolute right-3 top-[42px] cursor-pointer"
                onClick={() => toggleVisibility(field)}
              >
                {passwordVisibility[field] ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-8 mt-20">
        <button
          className="px-8 py-2 border rounded hover:bg-gray-50 transition-colors"
          onClick={() =>
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            })
          }
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center justify-center"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;