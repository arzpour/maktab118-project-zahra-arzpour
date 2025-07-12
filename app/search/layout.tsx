import HomeLayout from "@/providers/homeLayout";
import React from "react";

const SearchLayout: React.FC<IChildren> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default SearchLayout;
