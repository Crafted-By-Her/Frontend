import React, { useEffect, useState } from "react";
import VideoCard from "../Components/VideoCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const LearningPage = () => {
  const [videos, setVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  useEffect(() => {
    fetch("public/videos.json") 
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setDisplayedVideos(data.slice(0, videosPerPage)); 
      })
      .catch((err) => {
        console.error("Failed to fetch videos:", err);
      });
  }, []);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const nextVideos = videos.slice(0, nextPage * videosPerPage);
    setDisplayedVideos(nextVideos);
  };

  return (
    <>
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl text-center font-bold mb-6 text-gray-800 ">Learning Tutorials</h2>
      <p className="text-lg text-gray-700  mb-6">
        Welcome to our learning page! Here, you can explore a collection of
        tutorials that will guide you through various traditional Ethiopian
        crafts. These step-by-step videos are perfect for anyone looking to
        learn the art of basket weaving, pottery making, jewelry crafting, and
        more. Start learning today and dive into the beautiful world of
        Ethiopian handcrafts.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedVideos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>

      {videos.length > displayedVideos.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 border-2 border-gray-800 text-gray-800 bg-white font-medium rounded-md transition duration-300"
          >
            Show More 
          </button>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default LearningPage;
