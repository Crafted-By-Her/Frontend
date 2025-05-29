import React from "react";
import { Link } from "react-router-dom";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1121] text-white px-6 py-10 md:px-16 text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
        <div>
          <h2 className="font-bold text-lg mb-4">Company</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Help</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Install App</h2>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="w-40"
            />
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300 text-base">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="md:ml-2">
            © {currentYear}, All Rights Reserved by Crafted by Her
          </span>
        </div>

        <div className="flex items-center gap-4">
          <GlobeAltIcon className="h-5 w-5" />
          <span>English (US)</span>
          <a
            href="https://twitter.com/craftedbyher"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition duration-300"
          >
            <Twitter
              className="hover:text-orange-500 transition duration-200"
              size={20}
            />
          </a>
          <a
            href="https://facebook.com/craftedbyher"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:opacity-90 transition duration-300"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://instagram.com/craftedbyher"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition duration-300"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
