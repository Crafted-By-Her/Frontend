import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const DeleteProductButton = ({ productId, productName, onDelete, token }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const handleDelete = async () => {
    if (!token) {
      toast.error("Authentication required. Please login.");
      return;
    }

    setDeletingId(productId);
    setDeleteError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete product");
      }

      onDelete(productId);
      toast.success(`Product "${productName}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteError(error.message);
      toast.error(error.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="text-red-500 hover:text-red-700"
        aria-label="Delete Product"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete product{" "}
              <span className="font-semibold">"{productName}"</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={deletingId === productId}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingId === productId}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  deletingId === productId
                    ? "bg-red-400"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deletingId === productId ? (
                  <span className="flex items-center">
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
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProductButton;