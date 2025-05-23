import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('public/videos.json') 
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.slice(0, 4)); 
      })
      .catch((err) => console.error("Failed to fetch videos:", err));
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Creative Learning</h2>
        <Link
          to="/learningvideo"
          className="inline-flex items-center justify-center mr-5 px-3 py-2 border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-900 hover:text-white font-medium rounded-md transition duration-300"
        >
          View More <span className="ml-2 text-lg">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
