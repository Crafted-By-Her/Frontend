import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

const AddAdmin = ({ onClose, onAdminAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "male",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = getAuthToken();  

    try {
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      if (!formData.phoneNumber.startsWith("+251")) {
        throw new Error("Phone number must start with +251");
      }
      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const response = await fetch(
        `${apiUrl}/api/admin/create-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to create admin"
        );
      }

      console.log("Admin created:", result);
      setSuccess(true);
      onAdminAdded();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "male",
      });
    } catch (err) {
      console.error("Error creating admin:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-gray-800">Add New Admin</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Admin created successfully! Credentials have been sent to the provided
          email.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-xl p-6 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["firstName", "lastName", "email"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                +251
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber.replace("+251", "")}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith("+251")) {
                    handleChange(e);
                  } else {
                    handleChange({
                      target: {
                        name: "phoneNumber",
                        value: "+251" + value.replace(/^\+251/, ""),
                      },
                    });
                  }
                }}
                pattern="[0-9]{9}"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300"
                placeholder="948004309"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Format: +251XXXXXXXXX</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              minLength="8"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-900 text-black rounded-md px-6 py-2 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white rounded-md px-6 py-2 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
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
                Creating...
              </span>
            ) : (
              "Create Admin"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
