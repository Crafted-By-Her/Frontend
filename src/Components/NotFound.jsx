import React from "react";
import { Link } from "react-router-dom";
import { Ban } from "lucide-react"; 

const NoCategoriesFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Ban className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">No Categories Found</h1>
        <p className="text-gray-500 mb-6">
          We couldn't find any product categories at the moment. Please check back later or explore our main page.
        </p>
        <Link to="/">
          <button className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoCategoriesFound;
