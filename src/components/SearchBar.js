import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm, isDarkMode }) => (
  <div className="mb-6 max-w-lg mx-auto">
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-lg focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600 focus:ring-gray-400 placeholder-gray-400"
            : "bg-white text-black border-teal-500 focus:ring-teal-400 placeholder-gray-500"
        }`}
      />
      {/* Search Icon */}
      <FaSearch
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? "text-gray-400" : "text-teal-500"
        }`}
        size={20}
      />
    </div>
  </div>
);

export default SearchBar;
