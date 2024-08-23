import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#171717]">
      <div className="relative">
        {/* Outer ring animation */}
        <div className="w-14 h-14 rounded-full border-4 border-green-500 border-opacity-25 animate-ping"></div>

        {/* Center green ball */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
