import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdatePasswordPage from "./Updatepassword";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profilePhoto: null,
  });
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      toast.error("You need to login first");
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userData")) || JSON.parse(sessionStorage.getItem("userData"));

    if (storedUser) {
      setFormData(storedUser);
      setProfileImage(storedUser.profilePhoto || null);
      setInitialData(storedUser);
    }
  }, [navigate]);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(updatedFormData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      const updatedUser = { ...formData, profilePhoto: file };
      setFormData(updatedUser);
      const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
      storage.setItem("userData", JSON.stringify({ ...updatedUser, profilePhoto: null }));
    }
  };

  const handleRemoveImage = () => {
    const updatedUser = { ...formData, profilePhoto: null };
    setProfileImage(null);
    setFormData(updatedUser);
    const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(updatedUser));
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      setProfileImage(initialData.profilePhoto || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success("Profile updated successfully!");

        const updatedUser = {
          ...formData, 
          ...result, 
          profilePhoto: formData.profilePhoto instanceof File
            ? URL.createObjectURL(formData.profilePhoto)
            : result.profilePhoto || formData.profilePhoto
        };
  
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem("userData", JSON.stringify(updatedUser));
        window.dispatchEvent(new CustomEvent('userProfileUpdated', {
          detail: updatedUser
        }));
  
        setFormData(updatedUser);
        setInitialData(updatedUser);
        setProfileImage(updatedUser.profilePhoto);
      } else {
          const err = await response.json();
          toast.error(`Failed to update: ${err.error || "Unknown error"}`);
        }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${!showPasswordUpdate ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setShowPasswordUpdate(false)}
        >
          Profile Information
        </button>
        <button
          className={`px-4 py-2 font-medium ${showPasswordUpdate ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setShowPasswordUpdate(true)}
        >
          Update Password
        </button>
      </div>

      {!showPasswordUpdate ? (
        <form onSubmit={handleSubmit} className="border bg-white px-6 py-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mb-6">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(formData.firstName, formData.lastName)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-sm text-red-500 self-start sm:self-center hover:text-red-700"
                  disabled={loading}
                >
                  Remove
                </button>
              )}
              <label
                htmlFor="profile-upload"
                className={`flex items-center px-3 py-2 text-sm w-fit border border-gray-900 text-gray-900 font-semibold rounded cursor-pointer hover:bg-gray-50 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Change Picture <PencilSquareIcon className="w-4 h-4 ml-1" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="border p-3 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border p-3 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border p-3 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1 text-gray-700">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border p-3 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1 text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border p-3 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:opacity-50 ${
                loading ? 'cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      ) : (
        <UpdatePasswordPage />
      )}
    </div>
  );
};

export default ProfilePage;