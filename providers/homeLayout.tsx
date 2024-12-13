import Footer from "@/components/home/header-footer/footer";
import Header from "@/components/home/header-footer/header";
import React from "react";

const HomeLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
