import { HandHeart, Users, Globe } from "lucide-react";
import Footer from "../Components/Footer"
const AboutPage = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">About CraftedByHer</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering women artisans to showcase their handmade creations to the world
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <HandHeart size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To provide a platform for talented women artisans who lack traditional market access,
            helping them turn their skills into sustainable livelihoods.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Users size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Who We Serve</h3>
          <p className="text-gray-600">
            We support women from rural areas, refugee communities, and disadvantaged backgrounds
            who create beautiful handmade products but face barriers to selling them.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Globe size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
          <p className="text-gray-600">
            Since our founding, we've helped over 5,000 women artisans from 15 countries
            reach customers worldwide while preserving traditional crafts.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          CraftedByHer was founded in 2018 by a group of women who saw the untapped potential
          of home-based women artisans. Many of these women create exquisite handmade products
          but lack access to markets or face cultural barriers to selling their work.
        </p>
        <p className="text-gray-700">
          We built this platform to bridge that gap, providing not just an e-commerce solution
          but also training, community support, and fair pricing to ensure these talented women
          receive the recognition and compensation they deserve.
        </p>
      </div>
    </div>
     <Footer/>
     </>
  );
};

export default AboutPage;