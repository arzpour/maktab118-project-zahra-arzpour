import SearchList from "@/components/search/searchList";
import React from "react";

const searchPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 md:pb-0 text-white max-w-1770 mx-auto pt-32 md:pt-40">
      <div className="max-w-1400 mx-auto">
        <SearchList />
      </div>
    </div>
  );
};

export default searchPage;
