import React, { useState } from "react";

const AIAnalysisModal = ({ isOpen, onClose, analysis }) => {
  const [theme, setTheme] = useState("light");

  if (!isOpen) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getThemeClasses = () => {
    return theme === "light"
      ? "bg-white text-gray-800"
      : "bg-gray-800 text-white";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[80vh] flex flex-col ${getThemeClasses()}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">AI Analysis</h2>
          <div className="flex space-x-4">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-gray-200 rounded text-sm"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="overflow-y-auto">
          <h3 className="font-bold">Summary:</h3>
          <p className="mb-4">{analysis?.summary}</p>

          <h3 className="font-bold mt-4">Strengths:</h3>
          <ul className="list-disc pl-5 mb-4">
            {analysis?.strengths?.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">Weaknesses:</h3>
          <ul className="list-disc pl-5 mb-4">
            {analysis?.weaknesses?.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">Suggestions:</h3>
          <ul className="list-disc pl-5 mb-4">
            {analysis?.suggestions?.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisModal;
