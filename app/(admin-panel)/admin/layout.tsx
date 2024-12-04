import AdminPageHeader from "@/components/admin/header-footer/header";
import React from "react";

const HomeLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <AdminPageHeader />
      {children}
    </>
  );
};

export default HomeLayout;
