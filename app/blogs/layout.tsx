import HomeLayout from "@/providers/homeLayout";
import React from "react";

const BlogsLayout: React.FC<IChildren> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default BlogsLayout;
