import React from "react";

const Search = ({
  size = 26,
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
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
    </svg>
  </div>
);

export default Search;
