import {
  Users,
  Package,
  UserX,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import AddAdmin from "./AddAdmin";
import Card from "../../Components/Card";
import Pagination from "../../Components/Paginations"; 

const Dashboard = () => {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null); 
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const fetchDashboardData = async () => {
    const token = getAuthToken();
    if (!token) {
      console.error("No token found.");
      setAuthError("Authentication required. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/dashboard`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError("Session expired. Please login again.");
        } else {
          setAuthError("Failed to fetch dashboard data.");
        }
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setAdminData(data?.admins || []);
      setStats(
        data?.stats || {
          totalUsers: 0,
          totalAdmins: 0,
          activeUsers: 0,
          inactiveUsers: 0,
        }
      );
      setAuthError(null);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    const token = getAuthToken();
    if (!token) {
      console.error("No token found.");
      setAuthError("Authentication required. Please login.");
      return;
    }

    setDeletingId(adminId);
    setDeleteError(null);

    try {
      const response = await fetch(
        ` ${apiUrl}/api/admin/delete-admin/${adminId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete admin");
      }

      await fetchDashboardData();
    } catch (error) {
      console.error("Error deleting admin:", error);
      setDeleteError(error.message);
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setAdminToDelete(null);
    }
  };

  const openDeleteConfirmation = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteModal(false);
    setAdminToDelete(null);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      handleDeleteAdmin(adminToDelete._id);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalPages = Math.ceil(adminData.length / itemsPerPage);
  const currentAdmins = adminData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen space-y-6 relative">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {authError}
        </div>
      )}

      {deleteError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {deleteError}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading dashboard...
        </div>
      ) : authError ? (
        <div className="text-center py-20 text-gray-500">{authError}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              icon={<Users className="text-blue-600 w-6 h-6" />}
              label="Total Admins"
              value={stats?.totalAdmins ?? 0}
              bgColor="bg-indigo-50"
              textColor="text-indigo-700"
            />
            <Card
              icon={<Package className="text-blue-600 w-6 h-6" />}
              label="Total Users"
              value={stats?.totalUsers ?? 0}
              bgColor="bg-green-50"
              textColor="text-green-700"
            />
            <Card
              icon={<Users className="text-blue-600 w-6 h-6" />}
              label="Active Users"
              value={stats?.activeUsers ?? 0}
              bgColor="bg-blue-50"
              textColor="text-blue-700"
            />
            <Card
              icon={<UserX className="text-blue-600 w-6 h-6" />}
              label="Inactive Users"
              value={stats?.inactiveUsers ?? 0}
              bgColor="bg-amber-50"
               textColor="text-amber-700"
            />
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium text-gray-700">Admin List</h2>
              <button
                onClick={() => setShowAddAdminForm(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 text-sm rounded"
              >
               <Plus className="w-4 h-4" /> New Admin 
              </button>
            </div>

            <table className="w-full table-auto text-sm">
              <thead className="text-gray-500 bg-gray-100 border-b">
                <tr className="text-left text-gray-900 text-sm">
                  <th className="p-3">No.</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created By</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No admins found
                    </td>
                  </tr>
                ) : (
                  currentAdmins
                    .filter((admin) => admin.userInfo)
                    .map((admin, index) => {
                      const user = admin.userInfo;
                      const createdBy = admin.createdBy;

                      return (
                        <tr
                          key={admin._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3">
                            {(currentPage - 1) * itemsPerPage + index + 1}.
                          </td>
                          <td className="p-3">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3 capitalize">{user.role}</td>
                          <td className="p-3">
                            {user.isActive ? (
                              <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                                Active
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            {createdBy ? (
                              <>
                                {createdBy.firstName} {createdBy.lastName}
                                <div className="text-xs text-gray-400">
                                  {createdBy.email}
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-gray-400 italic">
                                System
                              </span>
                            )}
                          </td>
                          <td className="p-3 space-x-2">
                            <button
                              onClick={() => openDeleteConfirmation(admin)}
                              disabled={deletingId === admin._id}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                              aria-label="Delete Admin"
                            >
                              {deletingId === admin._id ? (
                                <svg
                                  className="animate-spin h-4 w-4"
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
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
      {showAddAdminForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
            <button
              onClick={() => setShowAddAdminForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
            >
              <X size={20} />
            </button>
            <AddAdmin
              onClose={() => setShowAddAdminForm(false)}
              onAdminAdded={fetchDashboardData}
            />
          </div>
        </div>
      )}
{showDeleteModal && adminToDelete && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        onClick={closeDeleteConfirmation}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <X size={20} />
      </button>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Confirm Deletion
        </h3>
        <p className="text-gray-600">
          Are you sure you want to delete admin{" "}
          <span className="font-semibold">
            {adminToDelete.userInfo.firstName} {adminToDelete.userInfo.lastName}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={closeDeleteConfirmation}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={deletingId === adminToDelete._id}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deletingId === adminToDelete._id ? (
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
  </div>
)}
    </div>
  );
};

export default Dashboard;