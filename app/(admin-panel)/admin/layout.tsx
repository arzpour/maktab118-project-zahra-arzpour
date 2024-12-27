import AdminPageHeader from "@/components/admin/header-footer/header";
import Guard from "@/providers/guard";
import React from "react";

const HomeLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <Guard>
        <AdminPageHeader />
        {children}
      </Guard>
    </>
  );
};

export default HomeLayout;
