import React from "react";
import { Link } from "react-router-dom";
import { Eye, Star } from "lucide-react";

const ProductCard = ({ title, description, price, images, averageRating, id , category }) => {
  return (
    <div className="max-w-xs w-full h-full  border flex flex-col rounded-lg shadow-lg bg-white overflow-hidden mt-5">
      <div className="relative group">
        <img
          src={images?.[0].url}
          alt={title}
          className="w-full h-64 object-cover transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Link
          to={`/products/${category}/${id}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-orange-500 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Eye size={18} className="text-white" />
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg text-gray-800 font-semibold truncate">{title}</h3>
          <div className="flex items-center gap-1 text-gray-800 text-sm">
            <Star size={16} fill="currentColor" className="text-orange-500" />
            <span>{averageRating}</span> 
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 flex-grow">{description}</p>
        <p className="text-lg text-gray-800 font-bold mt-1">{price} ETB</p>
      </div>
    </div>
  );
};

export default ProductCard;
