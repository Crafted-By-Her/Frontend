import React from "react";
import {
  PhoneIcon,
  MapPinIcon,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";

const SellerContactModal = ({ seller, onClose }) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8 max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Contact the Seller
        </h1>

        <div className="flex items-center gap-4">
          {seller?.profilePic ? (
            <img
              src={
                seller.profilePic.startsWith("http") ||
                seller.profilePic.startsWith("/")
                  ? seller.profilePic
                  : `${apiUrl}${seller.profilePic}`
              }
              alt={`${seller?.firstName} ${seller?.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl">
              {`${seller?.firstName?.[0] || ""}${
                seller?.lastName?.[0] || ""
              }`.toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {seller?.firstName || "Unknown"} {seller?.lastName || "Unknown"}
            </h2>
            <p className="text-gray-600">{seller?.email || "No email provided"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full text-gray-900">
          <div className="flex items-center gap-4">
            <PhoneIcon size={28} className="text-gray-900" />
            <p className="text-lg">{seller?.phoneNumber || "+251 948 822 471"}</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon size={28} className="text-gray-900" />
            <p className="text-lg">{seller?.address || "Addis Ababa, Bole"}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          {seller?.telegram && (
            <a
              href={`https://t.me/${seller.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0088cc] text-white hover:opacity-90 transition duration-300"
            >
              <Send size={22} />
            </a>
          )}
          {seller?.facebook && (
            <a
              href={`https://facebook.com/${seller.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:opacity-90 transition duration-300"
            >
              <Facebook size={22} />
            </a>
          )}
          {seller?.instagram && (
            <a
              href={`https://instagram.com/${seller.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition duration-300"
            >
              <Instagram size={22} />
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 text-white font-semibold bg-gray-800 hover:bg-gray-900 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SellerContactModal;