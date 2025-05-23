import React from "react";
import {
  InformationCircleIcon,
  ArrowUpTrayIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const steps = [
  { icon: InformationCircleIcon, label: "Product" },
  { icon: ArrowUpTrayIcon, label: "Upload Photo" },
  { icon: CheckCircleIcon, label: "Review" },
  { icon: PaperAirplaneIcon, label: "Submit" },
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="relative flex items-center justify-between mb-6 px-4">
    <div className="absolute top-4 left-0 right-0 h-0.5 z-0 flex justify-between px-6">
      {steps.slice(0, -1).map((_, index) => (
        <div
          key={index}
          className={`flex-1 border-t-2 border-dotted ${
            currentStep > index ? "border-green-500" : "border-gray-300"
          }`}
        />
      ))}
    </div>
    {steps.map((step, index) => {
      const Icon = step.icon;
      const isActive = index <= currentStep;

      return (
        <div
          key={index}
          className="relative z-10 flex flex-col items-center gap-1"
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              isActive
                ? "bg-green-500 text-white border-green-500"
                : "text-gray-400 border-gray-300"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <p
            className={`text-xs text-center font-medium ${
              isActive ? "text-green-500" : "text-gray-400"
            }`}
          >
            {step.label}
          </p>
        </div>
      );
    })}
  </div>
  );
};

export default Stepper;
