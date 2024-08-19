import React, { useState } from "react";
import Play from "@/svg/Play";

interface MusicCardProps {
  imageUrl: string;
  title: string;
  artist: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ imageUrl, title, artist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-[#181818] rounded-md p-4 transition-all duration-300 hover:bg-[#282828] cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <div
          className={`absolute right-2 bottom-2 transform transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
          <div className="relative">
            <Play />
            <div
              className={`absolute inset-0 rounded-full border-2 border-white transform transition-all duration-300 ${isHovered ? "scale-100 opacity-0" : "scale-50 opacity-100"}`}
            ></div>
          </div>
        </div>
      </div>
      <h3 className="text-white font-bold truncate">{title}</h3>
      <p className="text-gray-400 text-sm truncate">{artist}</p>
    </div>
  );
};

export default MusicCard;
