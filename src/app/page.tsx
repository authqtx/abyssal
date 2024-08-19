"use client";
import React, { useState, useEffect, useCallback } from "react";
import IconLink from "@/components/IconLink";
import SearchPopup from "@/components/SearchPopup";
import Home from "@/svg/Home";
import Search from "@/svg/Search";
import Music from "@/svg/Music";
import Arrow from "@/svg/Arrow";
import Play from "@/svg/Play";
import MusicCard from "@/components/MusicCard";
import ArtistCard from "@/components/ArtistCard";

const artistData = [
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616100005174214f3cf1cbe7139c1e26ffbb",
    name: "The Weeknd",
    role: "Artist",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab6761610000517458b784db7235ec6e30b874af",
    name: "Odetari",
    role: "Artist",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616100005174ba025c8f62612b2ca6bfa375",
    name: "Hatsune Miku",
    role: "Artist",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616100005174172e8da719488cb0da105cfd",
    name: "Deco*27",
    role: "Artist",
  },
];

const musicData = [
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02e06c1525c488705c512884bd",
    title: "Keep up",
    artist: "Odetari",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0dd6a5cd1dec96c4119c262",
    title: "One Of The Girls (with JENNIE, Lily Rose Depp)",
    artist: "The Weeknd, JENNIE, Lily-Rose Depp",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273786b6e14d94db2177fe8f9df",
    title: "Army Dreamers",
    artist: "Kate bush",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734f3bb9b3c7f2a5d2c7534716",
    title: "不可思議のカルテ 桜島麻衣 Ver.",
    artist: "Mai Sakurajima(CV:Asami Seto)",
  },
  {
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273183b7a8494d8947e07343ad2",
    title: "ラビットホール",
    artist: "DECO*27",
  },
];

const Page: React.FC = () => {
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
      const newHeight = heightInRem - (screenWidth < 640 ? 8 : 8);
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
          className={`flex ${
            isMobile ? "flex-row" : "flex-col"
          } transition-all duration-300 ease-in-out`}
        >
          <div
            className={`${
              isMobile ? "w-1/2" : "w-[18rem]"
            } sticky top-3 mx-2 mt-3 bg-[#171717] rounded-lg p-2 transition-all duration-300 ease-in-out`}
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
            className={`${
              isMobile ? "w-1/2" : "w-[18rem]"
            } mx-2 mt-3 bg-[#171717] rounded-lg p-2 transition-all duration-300 ease-in-out`}
            style={{ height: isMobile ? "auto" : `${calculatedHeight}rem` }}
          >
            <IconLink href="/library" Icon={Music} label="Library" />
            <div className="bg-[#252525] mt-5 h-32 rounded-md w-full">
              <h6 className="p-2 text-white font-semibold">
                Create your first playlist
              </h6>
              <h6 className="pl-2 -mt-1 text-neutral-400 font-normal text-sm">
                It's easy, we'll help you
              </h6>
              <div className="w-36 hover:w-40 transition-all h-10 m-2 mt-4 bg-white rounded-full">
                <h6 className="flex items-center font-semibold text-base justify-center pt-[0.50rem]">
                  Create playlist
                </h6>
              </div>
            </div>

            <div className="bg-[#252525] mt-5 h-32 rounded-md w-full">
              <h6 className="p-2 text-white font-semibold">
                Let's find some podcasts to follow
              </h6>
              <h6 className="pl-2 -mt-1 text-neutral-400 font-normal text-sm">
                We'll keep you updated on new episodes
              </h6>
              <div className="w-36 hover:w-40 transition-all h-10 m-2 mt-4 bg-white rounded-full">
                <h6 className="flex items-center font-semibold text-base justify-center pt-[0.50rem]">
                  Browse podcasts
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex-1 ${
          !isVisible ? "w-full h-full" : "ml-1"
        } bg-[#171717] p-4 sm:mt-3 mt-0 sm:rounded-lg rounded-none overflow-y-auto relative transition-all duration-300 ease-in-out`}
      >
        {/* Fixed Gradient */}
        <div
          className="absolute inset-x-0 top-0 h-[200px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(6, 93, 69, 0.8), rgba(23, 23, 23, 0))",
            pointerEvents: "none",
          }}
        />

        {/* ARROW ICONS */}
        <div className="absolute left-3 top-4 md:top-8 opacity-0 sm:opacity-100 transition-opacity duration-300">
          <Arrow mirror={true} />
          <Arrow />
        </div>

        {/* LOGIN/ SIGNUP SECTION */}
        <div className="absolute right-0 md:top-10 top-4 grid grid-flow-col md:gap-10 gap-2 md:mr-10 mr-2">
          <div className="flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-[#252525] p-2 rounded w-[6rem] h-10 transition-all duration-300 ease-in-out">
            <h6 className="text-neutral-300 font-semibold">Sign up</h6>
          </div>
          <div className="flex items-center justify-center cursor-pointer hover:bg-[#F8F8F8] p-2 rounded transition-all duration-300 ease-in-out h-10 w-[6rem] bg-white rounded-full">
            <h6 className="text-black font-semibold">Log in</h6>
          </div>
        </div>

        {/*WELCOME MESSAGE */}
        <h6 className="absolute left-3 sm:left-[1.8rem] top-[6rem] font-semibold text-white text-2xl md:text-3xl">
          Welcome back
        </h6>

        <div className="absolute left-3 sm:left-[1.8rem] top-[10rem] sm:top-[9rem] bg-white w-[calc(100%-1.5rem)] sm:w-[17rem] rounded-md bg-opacity-5 hover:cursor-pointer hover:bg-opacity-10 transition-all group">
          <img className="size-[4rem] rounded-l-md" src="/media/liked.webp" />
          <div className="absolute right-2 top-[0.80rem] hidden group-hover:block">
            <Play />
          </div>
          <label className="text-white flex items-center justify-center -mt-[2.7rem] mb-[1.2rem]">
            Liked songs
          </label>
        </div>

        {/*Newest songs */}
        <h6 className="absolute left-8 sm:left-[1.8rem] top-[23rem] sm:top-[19rem] font-semibold text-white text-xl md:text-2xl">
          Newest songs
        </h6>

        {/* Songs Grid */}
        <div className="mt-[24rem] sm:mt-[20rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {musicData.map((item, index) => (
            <MusicCard key={index} {...item} />
          ))}
        </div>

        {/*Artist*/}
        <div className="relative">
          <h6 className="absolute left-5 sm:left-[1rem] -mt-[2rem] font-semibold text-white text-xl md:text-2xl z-10">
            Discover artists
          </h6>
          <div className="mt-[5rem] sm:mt-[7rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artistData.map((item, index) => (
              <ArtistCard key={index} {...item} />
            ))}
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
      </div>
    </div>
  );
};

export default Page;
