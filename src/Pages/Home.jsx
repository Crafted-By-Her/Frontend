import React from "react";
import ProductList from "../Components/ProductList";
import VideoList from "../Components/VideoList";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import AllProduct from "../Components/Allproduct";
import Bacimage from "../assets/backimg.jpeg"
const HomePage = () => {
  return (
    <>
      <div
        className="relative h-[350px] md:h-[450px] lg:h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: `url('${Bacimage}')`,
        }}
      >
        <div className="bg-black bg-opacity-70 w-full h-full">
          <div className="flex flex-col justify-center items-center text-center text-white px-4 h-full">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight mt-10">
              <span className="text-[#ff5a00] font-bold">Crafted By Her</span>,{" "}
              <span className="text-white font-bold">Loved By You</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl">
              Celebrate handmade creations by women across Ethiopia.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Link
                to="/about"
                className="px-6 py-2 text-sm border border-orange-600 text-orange-500 rounded font-semibold hover:bg-orange-600 hover:text-white transition duration-150"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ProductList />
      <VideoList />
      <div className="border-t-2 border-gray-200 ">
        <AllProduct />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
