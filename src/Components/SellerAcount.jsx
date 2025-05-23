import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
const SellerAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profilePhoto: null,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData")) || JSON.parse(sessionStorage.getItem("userData"));

    if (storedUser) {
      setFormData(storedUser);
      setProfileImage(storedUser.profilePhoto || null);
      setInitialData(storedUser);
    }
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem("userData", JSON.stringify(updatedFormData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      const updatedUser = { ...formData, profilePhoto: file };
      setFormData(updatedUser);
      localStorage.setItem("userData", JSON.stringify({ ...updatedUser, profilePhoto: null })); 
    }
  };
  
  const handleRemoveImage = () => {
    const updatedUser = { ...formData, profilePhoto: null };
    setProfileImage(null);
    setFormData(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      setProfileImage(initialData.profilePhoto || null);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    toast.error("No token found. Please log in again.");
    return;
  }

  const data = new FormData();
  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("email", formData.email);
  data.append("phoneNumber", formData.phoneNumber);
  data.append("gender", formData.gender);

  if (formData.profilePhoto instanceof File) {
    data.append("profilePhoto", formData.profilePhoto);
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/users/profile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    if (response.ok) {
      const result = await response.json();
      toast.success("Profile updated successfully!");

      const updatedUser = {
        ...result,
        profilePhoto: formData.profilePhoto instanceof File 
          ? URL.createObjectURL(formData.profilePhoto) 
          : result.profilePhoto || formData.profilePhoto
      };

      localStorage.setItem("userData", JSON.stringify({
        ...updatedUser,
        profilePhoto: result.profilePhoto || null 
      }));
      window.dispatchEvent(new CustomEvent('profileUpdated', {
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
  }
};
  

  return (
    <>
      <h3 className="text-lg text-gray-900 font-semibold mb-4">Profile Information</h3>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {getInitials(formData.firstName, formData.lastName)}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {profileImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-sm text-red-500 self-start sm:self-center"
              >
                Remove
              </button>
            )}

            <label
              htmlFor="profile-upload"
              className="flex items-center px-3 py-2 text-sm w-fit border border-gray-900 text-gray-900 font-semibold rounded cursor-pointer"
            >
              Change Picture <PencilSquareIcon className="w-4 h-4 ml-1" />
            </label>

            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <label className="block text-sm font-medium mb-3">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border p-3 text-sm rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border p-3 text-sm rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-3 text-sm rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-3 text-sm rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Gender</label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="Gender"
              className="border p-3 text-sm rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-8 mt-20">
          <button
            type="button"
            className="px-8 py-2 border rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-orange-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default SellerAccount;
