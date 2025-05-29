import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../Components/Stepper";

const SellProduct = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    images: [],
  });
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData") || sessionStorage.getItem("userData");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (storedUserData && token) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setGeneralError("");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: files });
    setImagePreviews(previews);
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.category || !formData.title || !formData.price) {
        setGeneralError("Please fill in all required fields (Category, Title, and Price).");
        return false;
      }
      if (isNaN(formData.price) || formData.price <= 0) {
        setGeneralError("Please enter a valid price.");
        return false;
      }
    }
    if (step === 2 && formData.images.length < 2) {
      setGeneralError("Please upload at least 2 photos.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setGeneralError("");
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step === 3 ? 1 : step - 1);
    setGeneralError("");
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
  
    if (!userData) {
      setGeneralError("You need to be logged in to list a product.");
      return;
    }
  
    setLoading(true);
    setGeneralError("");
  
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }
  
      const formPayload = new FormData();
      formPayload.append('title', formData.title.trim());
      formPayload.append('description', formData.description.trim() || "No description");
      formPayload.append('category', formData.category);
      formPayload.append('price', formData.price);
      formPayload.append('contactInfo', userData.email);
      formPayload.append('userId', userData.id);
      formData.images.forEach((image, index) => {
        formPayload.append(`images`, image); 
      });
  
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Full error response:", {
          status: response.status,
          statusText: response.statusText,
          body: responseData,
        });
        throw new Error(responseData.message || "Product creation failed");
      }
  
      if (!responseData._id) {
        throw new Error("Unexpected response format from server");
      }
  
      setStep(4);
    } catch (error) {
      console.error("Full submission error:", error);
      setGeneralError(
        error.message ||
        "Failed to list product. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-2 max-w-3xl mx-auto">
      <Stepper currentStep={step - 1} />

      {step === 1 && (
        <div className="rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Tell us about your listing</h2>
          {generalError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md mb-4">
              {generalError}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Bags">Bags</option>
              <option value="Clothes">Clothes</option>
              <option value="Shoes">Shoes</option>
              <option value="Jewelries">Jewelries</option>
              <option value="Arts">Arts</option>
              <option value="Beauty"> Bath & Beauty</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              required
              placeholder="e.g. Genuine Leather Handbag"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              rows="4"
              placeholder="Describe your product in detail..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (ETB) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              required
              min="0"
              step="0.01"
              placeholder="Enter price in ETB"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Photos</h2>
          {generalError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md mb-4">
              {generalError}
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12v9m-3-3l3-3 3 3"
                ></path>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Drag and Drop here</p>
            <p className="text-gray-600 mb-4">OR</p>
            <label className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600 inline-block">
              Select files
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </label>
            {imagePreviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Selected files:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="border rounded-md p-1">
                      <img src={preview} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-md" />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {imagePreviews.length} of 3 files selected
                </p>
              </div>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Upload at least 2 clear photos (JPEG, PNG, max 5MB each)
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Review your listing</h2>
          {generalError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md mb-4">
              {generalError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Product Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-900">{formData.category || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="text-gray-900">{formData.title || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-900 whitespace-pre-line">
                    {formData.description || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-gray-900">{formData.price ? `${formData.price} ETB` : "Not specified"}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">images</h3>
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="border rounded-md p-1">
                      <img src={preview} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-md" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No images uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Product Listed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your product is now live and visible to potential buyers.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  category: "",
                  title: "",
                  description: "",
                  price: "",
                  photos: [],
                });
                setImagePreviews([]);
                setGeneralError("");
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              List Another Item
            </button>
            <button
              onClick={onClose || (() => navigate('/'))}
              className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
            >
              Done
            </button>
          </div>
        </div>
      )}
          <div className="flex justify-between mt-6">
        {step > 1 && step < 4 && (
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 ml-auto"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded ml-auto ${
              loading
                ? "bg-orange-300 text-white cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>

    </div>
  );
};

export default SellProduct;
