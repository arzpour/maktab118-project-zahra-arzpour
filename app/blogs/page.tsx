import BlogList from "@/components/home/blogs/blog-list";
import React from "react";

const BlogPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto pt-20 sm:pt-40">
      <div className="max-w-1400 mx-auto">
        <BlogList status="all" />
      </div>
    </div>
  );
};

export default BlogPage;
