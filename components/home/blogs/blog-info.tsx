"use client";

import { useParams } from "next/navigation";
import React from "react";
import BlogList from "./blog-list";
import useGetBlogById from "@/hooks/useGetBlogById";
import Image from "next/image";

const BlogInfoById = () => {
  const { blogId } = useParams();

  const { data: blog } = useGetBlogById(blogId as string);
  console.log("🚀 ~ BlogInfoById ~ data:", blog);

  return (
    <>
      {blog && (
        <div className="">
          <Image
            width={500}
            height={500}
            className="rounded-t-lg h-12.5"
            src={`http://localhost:8000/images/blogs/${blog?.thumbnail}`}
            alt="blog-image"
          />
          <h3 className="text-orange py-3 pb-5">{blog?.title}</h3>
          <p
            className="pb-20"
            dangerouslySetInnerHTML={{
              __html: blog?.description as string | TrustedHTML,
            }}
          ></p>
        </div>
      )}
      <BlogList status="group" />
    </>
  );
};

export default BlogInfoById;
