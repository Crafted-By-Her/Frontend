import React, { useEffect, useState } from "react";
import { UserX } from "lucide-react";
import Card from "../../Components/Card";
import Pagination from "../../Components/Paginations";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchInactiveUsers = async () => {
      if (!token) {
        setError("No token found, authorization denied");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl}/api/admin/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users.");
        }

        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveUsers();
  }, [token]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      setCurrentPage(1);
    } else {
      const filtered = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, users]);

  const handleActivateUser = async (userId) => {
    if (!token) {
      setError("No token found, authorization denied");
      return;
    }

    try {
      const response = await fetch(
        ` ${apiUrl}/api/admin/users/${userId}/activate`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to activate user.");
      }
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: true, warnings: 0 } : user
        )
      );
      setFilteredUsers(
        filteredUsers.map((user) =>
          user._id === userId ? { ...user, isActive: true, warnings: 0 } : user
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 min-h-screen space-y-6">
      <h1 className="text-2xl font-medium text-gray-800">Inactive Users</h1>

      {loading ? (
        <p className="text-center py-20 text-gray-500">
          Loading Inactive Users...
        </p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Card
            icon={<UserX className="text-blue-600 w-6 h-6" />}
            label="Inactive Users"
            value={filteredUsers.length}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 overflow-x-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Inactive User List
                </h2>
                <input
                  type="text"
                  placeholder="Search by name"
                  className="border rounded-2xl px-4 py-3 w-1/2 mb-4 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="min-w-full border rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-900 text-sm">
                    <th className="p-3">No.</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Warnings</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-gray-500">
                        {searchTerm
                          ? "No users match your search"
                          : "No inactive users found"}
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="text-gray-600 hover:bg-gray-50 text-sm"
                      >
                        <td className="p-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}.
                        </td>
                        <td className="p-3">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.phoneNumber}</td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3">{user.warnings}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded text-sm font-medium bg-red-200 text-red-800">
                            Inactive
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleActivateUser(user._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Activate
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
