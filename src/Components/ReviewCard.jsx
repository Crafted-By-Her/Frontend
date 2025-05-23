import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const ReviewCard = ({ reviewer }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={reviewer.profilePic}
          alt={reviewer.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900">{reviewer.name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < reviewer.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-2">{reviewer.comment}</p>
      <span className="text-xs flex justify-end text-gray-500">
        {reviewer.date}
      </span>
    </div>
  );
};

export default ReviewCard;
