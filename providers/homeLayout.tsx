import Header from "@/components/home/header";
import React from "react";

const HomeLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HomeLayout;
