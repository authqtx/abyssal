import React from "react";

interface PlayProps {
  size?: number;
  bgSize?: number;
  bgColor?: string;
}

const Play: React.FC<PlayProps> = ({
  size = 16,
  bgSize = 40,
  bgColor = "#22c55e",
}) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      backgroundColor: bgColor,
      width: `${bgSize}px`,
      height: `${bgSize}px`,
      padding: `${(bgSize - size) / 2}px`, // Adjust padding to center the smaller SVG inside the larger background
    }}
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
  </div>
);

export default Play;
