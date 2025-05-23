import React, { useState } from "react";
import Footer from "../Components/Footer";

const faqs = [
  {
    question: "How do I buy a product?",
    answer: "Browse the available products, and when you find something you like, click on it to view the details. If you're interested, log in to see the seller's contact information and reach out to them directly."
  },
  {
    question: "Do I need to create an account to buy?",
    answer: "Yes, you need to create an account and log in to view seller contact details and make a purchase."
  },
  {
    question: "How do I contact the seller?",
    answer: "Once you are logged in and viewing the product details page, the seller's contact information will be displayed. Use that information to reach out to them directly via phone or chat."
  },
  {
    question: "Is there a delivery service?",
    answer: "Currently, we do not offer delivery. You will arrange the delivery or pick-up directly with the seller after contacting them."
  },
  {
    question: "Is there any payment method through the website?",
    answer: "No, our platform does not support online payments. All transactions and agreements are made directly between the buyer and the seller."
  },
  {
    question: "How do I sell a product?",
    answer: "To sell your product, first create an account as a seller. Once logged in, go to your seller dashboard and click on 'Add Product'. Fill in the product details, upload clear images, and publish your listing. Interested buyers will contact you directly through the contact info you provide."
  },
  {
    question: "Can anyone become a seller?",
    answer: "Currently, only approved users (such as women artisans) are allowed to sell products. Make sure to complete the seller registration form and meet the criteria before you can post listings."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 bg-white shadow-sm transition duration-300 hover:shadow-md"
          >
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <span className="text-xl text-orange-500">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-600 transition-all duration-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FAQPage;
