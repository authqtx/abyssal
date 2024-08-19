import React from "react";

const Music = ({
  size = 25,
  color = "currentColor",
  stroke = "currentColor",
  bgColor = "transparent",
  borderRadius = "0",
}) => (
  <div
    style={{
      backgroundColor: bgColor,
      borderRadius: borderRadius,
      display: "inline-flex",
      padding: "4px", // Optional: Add padding around the SVG
    }}
  >
    <svg
      stroke={stroke}
      fill={color}
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      <path d="M17 17v-13h4"></path>
      <path d="M13 5h-10"></path>
      <path d="M3 9l10 0"></path>
      <path d="M9 13h-6"></path>
    </svg>
  </div>
);

export default Music;
