import React, { useState } from "react";
import SellerAcount from "../../Components/SellerAcount";
import SellerSecurity from "../../Components/SellerSecurity";

const Account = () => {
  const [activeTab, setActiveTab] = useState("account");
  return (
    <div>
      <h2 className="text-3xl text-gray-900 font-semibold mb-10">Account</h2>

      <div className="flex border bg-white rounded-2xl overflow-hidden mb-6">
        <button
          className={`flex-1 py-3 font-medium ${
            activeTab === "account"
              ? "text-blue-600 bg-blue-100"
              : "text-gray-800"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={`flex-1 py-3 font-medium ${
            activeTab === "security"
              ? "text-blue-600 bg-blue-100"
              : "text-gray-800"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        {activeTab === "account" ? (
          <SellerAcount />
        ) : (
          <SellerSecurity  />
        )}
      </div>
    </div>
  );
};

export default Account;
