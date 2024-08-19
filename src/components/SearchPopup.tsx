import React from "react";

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

export default SearchPopup;
