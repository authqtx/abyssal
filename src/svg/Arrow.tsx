import React from "react";

const Arrow = ({
  size = 40,
  color = "white", // White color for the SVG
  bgColor = "black", // Black background color for the circle
  hoverBgColor = "#121212", // Darker shade of black for hover
  borderRadius = "50%", // Circle shape
  mirror = false, // Optional: Mirroring
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: isHovered ? hoverBgColor : bgColor,
        borderRadius: borderRadius,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
        height: size,
        width: size,
        padding: "4px",
        transform: mirror ? "scaleX(-1)" : "none",
        transition:
          "background-color 0.3s ease, transform 0.3s ease, cursor 0.3s ease",
        cursor: isHovered ? "pointer" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        fill={color}
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M15 12l-6-6v12z" /> {/* Arrow path resembling a "<" */}
      </svg>
    </div>
  );
};

export default Arrow;
