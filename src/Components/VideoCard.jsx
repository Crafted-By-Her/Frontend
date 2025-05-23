import React from 'react';

const VideoCard = ({ videoId, title, description }) => {
  return (
    <div className="max-w-lg w-full rounded-lg shadow-lg bg-white overflow-hidden mt-10">
    <div className="aspect-w-12 aspect-h-12">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
  );
};

export default VideoCard;
