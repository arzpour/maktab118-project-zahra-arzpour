"use client";

import React from "react";
import Link from "next/link";
import BlogCard from "./blog-card";
import { ProductCardSkeleton } from "../products/product-card";
import useGetBlogs from "@/hooks/useGetBlogs";

interface IBlogList {
  status: "group" | "all";
}

const BlogList: React.FC<IBlogList> = ({ status }) => {
  const { data: blogs, isLoading } = useGetBlogs(Infinity);

  let blogList;

  if (blogs && status === "all") {
    blogList = blogs?.data.blogs;
  } else if (blogs?.total && blogs?.total > 0 && status === "group") {
    blogList = blogs?.data?.blogs.slice(0, 4);
  }
  return (
    blogs &&
    blogs.total > 0 && (
      <div className="pt-14 xl:mx-5">
        {status === "group" && (
          <div className="flex justify-between items-center mx-10 lg:mx-0 mb-7">
            <h4 className="text-lg text-slate-100 pr-4">وبلاگ</h4>
            <Link href="/blogs">
              <p className="text-orange hover:border-b hover:border-b-orange text-sm px-6 py-2.5 rounded-full cursor-pointer">
                مشاهده همه
              </p>
            </Link>
          </div>
        )}
        <div
          className={`flex gap-5 xl:gap-10 items-center justify-center flex-wrap px-5 lg:px-0 ${
            status === "group" ? "xl:flex-nowrap" : ""
          }`}
        >
          {isLoading &&
            [1, 2, 3, 4].map((el) => <ProductCardSkeleton key={el} />)}
          {(blogList ?? [])?.map((el) => (
            <BlogCard key={el._id} {...el} />
          ))}
        </div>
      </div>
    )
  );
};

export default BlogList;
