import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Footer from "../Components/Footer";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "c25781b9-8824-4d8e-abb5-816760f7732c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        event.target.reset();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-fade-in">
            <span>Message sent successfully!</span>
          </div>
        )}

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from artisans, customers, and partners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-orange-700 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-orange-500 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">General Inquiries</h3>
                  <p className="text-gray-600">legal@craftedbyher.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-orange-500 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Artisan Support</h3>
                  <p className="text-gray-600">+251 912346578</p>
                  <p className="text-sm text-gray-500">
                    Monday-Friday, 9am-5pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-orange-500 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Headquarters</h3>
                  <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com/craftedbyher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition duration-300"
                >
                  <Twitter size={20} />
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
                <a
                  href="https://github.com/craftedbyher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:opacity-90 transition duration-300"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;