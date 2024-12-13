import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="relative w-72">
      <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
        <IoSearchOutline className="w-4 h-4 text-gray-300 relative bottom-0.5" />
      </div>
      <input
        type="search"
        className="block w-full placeholder:text-xs py-2 md:placeholder:text-base bg-BackgroundColor outline-none rounded-full px-8 md:py-3 pr-12 ps-10 text-sm text-gray-900 border border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="اینجا سرچ کنید..."
      />
    </div>
  );
};

export default SearchInput;
