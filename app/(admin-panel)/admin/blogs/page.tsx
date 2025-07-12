import BlogList from "@/components/admin/blog/blog";
import React from "react";

const AdminBlogsPage = () => {
  return (
    <div className="bg-BackgroundColor text-white min-h-screen max-w-1800 mx-auto">
      <div className="max-w-1500 mx-auto pt-10 pb-24">
        <BlogList />
      </div>
    </div>
  );
};

export default AdminBlogsPage;
