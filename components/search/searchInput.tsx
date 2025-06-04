"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface ISearchInput {
  device?: "mobile" | "desktop";
}

const SearchInput: React.FC<ISearchInput> = ({ device }) => {
  const [value, setValue] = React.useState<string>("");
  const router = useRouter();

  const debounceValue = useDebounce({ orgValue: value, timeout: 100 });

  React.useEffect(() => {
    if (debounceValue.trim()) {
      router.push(`/search?query=${debounceValue}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div
      className={`relative w-44 ${
        device === "mobile" ? "sm:w-60 md:w-72" : "sm:w-72"
      }`}
    >
      <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
        <IoSearchOutline className="w-5 h-5 relative bottom-0.5" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full text-slate-200 placeholder:text-xs py-2 md:placeholder:text-base bg-BackgroundColor outline-none rounded-full px-8 md:py-2.5 pr-12 ps-10 text-sm text-gray-900 border border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="اینجا سرچ کنید..."
      />
    </div>
  );
};

export default SearchInput;
