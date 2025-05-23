import React from "react";
import { Flag } from "lucide-react";
import toast from "react-hot-toast";

const IncreaseWarningButton = ({ userId, token, onWarningIncreased }) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
 const handleIncreaseWarning = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/admin/users/${userId}/warnings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (!response.ok) {
      throw new Error("Failed to increase warning");
    }

    const data = await response.json();
    toast.success(
      `Warning increased. Total warnings: ${data.warnings}. Account is now ${
        data.isActive ? "active" : "deactivated"
      }.`
    );
    onWarningIncreased(userId, data.warnings);
    console.log("Data:", data)
  } catch (error) {
    console.error("Error increasing warning:", error);
    toast.error("Failed to increase warning.");
  }
};


  return (
    <button
      className="text-gray-600 hover:text-blue-600"
      title="Increase warning"
      onClick={handleIncreaseWarning}
    >
      <Flag size={16} />
    </button>
  );
};

export default IncreaseWarningButton;
