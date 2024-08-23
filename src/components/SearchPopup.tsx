import React, { useEffect, useRef } from "react";

interface SearchPopupProps {
  isSearchOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Optional keyboard handler
}

const SearchPopup: React.FC<SearchPopupProps> = ({
  isSearchOpen,
  onClose,
  onSubmit,
  searchQuery,
  setSearchQuery,
  handleKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus(); // Focus the input when the popup opens
    }
  }, [isSearchOpen, inputRef]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      <div className="bg-[#171717] p-6 rounded-lg w-full max-w-2xl z-10 transform transition-all duration-300">
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full p-3 rounded bg-[#252525] text-white border-2 border-[#065D45] focus:outline-none focus:border-[#0A8F6C] transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Optional keyboard handler prop
          />
        </form>
      </div>
    </div>
  );
};

export default SearchPopup;
