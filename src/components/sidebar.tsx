"use client";
import React, { useState, useEffect, useCallback } from "react";
import Home from "@/svg/Home";
import Search from "@/svg/Search";
import Link from "next/link";
import Music from "@/svg/Music";
import Arrow from "@/svg/Arrow";

interface IconLinkProps {
  href: string;
  Icon: React.FC<{ size: number; color: string; stroke: string }>;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // Updated type
}

const IconLink: React.FC<IconLinkProps> = ({ href, Icon, label, onClick }) => (
  <Link href={href} className="block" onClick={onClick} aria-label={label}>
    <div className="flex items-center cursor-pointer hover:bg-[#252525] p-2 rounded transition-all duration-300 ease-in-out">
      <Icon size={20} color="#ffffff" stroke="#ffffff" />
      <span className="ml-4 text-white text-sm">{label}</span>
    </div>
  </Link>
);

interface SearchPopupProps {
  isSearchOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPopup: React.FC<SearchPopupProps> = ({
  isSearchOpen,
  onClose,
  onSubmit,
  searchQuery,
  setSearchQuery,
}) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
  >
    <div
      className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    ></div>
    <div className="bg-[#171717] p-6 rounded-lg w-full max-w-2xl z-10 transform transition-all duration-300 scale-90 sm:scale-100 -translate-y-1/4">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 rounded bg-[#252525] text-white border-2 border-[#065D45] focus:outline-none focus:border-[#0A8F6C] transition-all duration-300"
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  </div>
);

const Sidebar: React.FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateDimensions = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      const heightInRem = screenHeight / 16;
      const newHeight = heightInRem - (screenWidth < 640 ? 8 : 9.7);
      setCalculatedHeight(newHeight);
      setIsVisible(screenWidth >= 640);
      setIsMobile(screenWidth < 640);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleSearchClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      setIsSearchOpen(true);
    },
    [],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const results = {
        query: searchQuery,
        timestamp: new Date().toISOString(),
      };
      setSearchResults(results);
      console.log("Search Results:", results);
      setIsSearchOpen(false);
      setSearchQuery("");
    },
    [searchQuery],
  );

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {isVisible && (
        <div
          className={`flex ${isMobile ? "flex-row" : "flex-col"} transition-all duration-300 ease-in-out`}
        >
          <div
            className={`${isMobile ? "w-1/2" : "w-[18rem]"} sticky top-3 mx-2 mt-3 bg-[#171717] rounded-lg p-2 transition-all duration-300 ease-in-out`}
          >
            <IconLink href="/" Icon={Home} label="Home" />
            <IconLink
              href="/search"
              Icon={Search}
              label="Search"
              onClick={handleSearchClick}
            />
          </div>
          <div
            className={`${isMobile ? "w-1/2" : "w-[18rem]"} mx-2 mt-3 bg-[#171717] rounded-lg p-2 transition-all duration-300 ease-in-out`}
            style={{ height: isMobile ? "auto" : `${calculatedHeight}rem` }}
          >
            <IconLink href="/library" Icon={Music} label="Library" />
          </div>
        </div>
      )}
      <div
        className={`flex-1 ${!isVisible ? "w-full h-full" : "ml-1"} bg-[#171717] mb-3 p-4 mt-3 rounded-lg overflow-y-auto relative transition-all duration-300 ease-in-out`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(6, 93, 69, 0.8), rgba(23, 23, 23, 0))",
          backgroundSize: "100% 200px",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ARROW ICONS */}
        <div className="absolute left-3 top-4 md:top-8 opacity-0 sm:opacity-100 transition-opacity duration-300">
          <Arrow mirror={true} />
          <Arrow />
        </div>

        {/* LOGIN/ SIGNUP SECTION */}
        <div className="absolute right-0 md:top-10 top-4 grid grid-flow-col md:gap-10 mr-10">
          <div className="flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[#252525] p-2 rounded w-[6rem] h-10 transition-all duration-300 ease-in-out">
            <h6 className="text-neutral-300 font-semibold">Sign up</h6>
          </div>
          <div className="flex items-center justify-center cursor-pointer hover:bg-[#F8F8F8] p-2 rounded transition-all duration-300 ease-in-out h-10 w-[6rem] bg-white rounded-full">
            <h6 className="text-black font-semibold">Log in</h6>
          </div>
        </div>
        {/* Search Popup */}
        <SearchPopup
          isSearchOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Sidebar;
