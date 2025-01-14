"use client";

import useGetBlogs from "@/hooks/useGetBlogs";
import React from "react";

const BlogList = () => {
  const { data } = useGetBlogs();
  console.log(data, "blogsssss");

  return <div>BlogList</div>;
};

export default BlogList;
