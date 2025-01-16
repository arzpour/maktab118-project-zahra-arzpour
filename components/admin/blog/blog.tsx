import React from "react";
import AddBlogBtn from "./add-blog-btn";
import BlogListTable from "./blog-list-table";

const BlogList = () => {
  return (
    <div className="mx-10">
      <div className="w-full flex gap-2 justify-between items-center mb-4 mt-1 pl-3">
        <p className="font-medium xl:text-lg hidden sm:block">بلاگ ها</p>
        <AddBlogBtn />
      </div>
      <BlogListTable />
    </div>
  );
};

export default BlogList;
