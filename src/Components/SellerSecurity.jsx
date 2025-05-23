import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const SellerSecurity = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userAuthenticated, setUserAuthenticated] = useState(false);

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

    if (newPassword.length > 8) {
      toast.error("New password should be a maximum of 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      toast.error("User is not authenticated. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/users/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password updated successfully");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        console.error("Failed to update password:", data);
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error during password update:", error);
      toast.error("Something went wrong");
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
    <>
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
          className="px-8 py-2 border rounded"
          onClick={() =>
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            })
          }
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 bg-orange-500 text-white rounded"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default SellerSecurity;
