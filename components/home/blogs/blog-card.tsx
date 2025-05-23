import moment from "moment-jalaali";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface IBlogCard {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const BlogCard: React.FC<IBlogCard> = ({
  title,
  thumbnail,
  description,
  _id,
  createdAt,
  updatedAt,
}) => {
  return (
    <Link href={`/blogs/${_id}`}>
      <div className="max-w-sm border w-72 h-96 border-gray-700 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image
          width={500}
          height={500}
          className="rounded-t-lg h-12.5"
          src={`http://localhost:8000/images/blogs/${thumbnail}`}
          alt="product-image"
        />
        <div className="p-5">
          <div className="flex justify-between mb-1 items-baseline py-2">
            <h5 className="font-bold tracking-tight text-slate-50 truncate">
              {title}
            </h5>
            <span className="mb-3 text-sm text-slate-400 truncate">
              {moment(updatedAt ?? createdAt)
                .locale("fa")
                .format("jYYYY/jMM/jDD")}{" "}
            </span>
          </div>
          <div
            className="text-sm font-bold tracking-tight text-slate-300 line-clamp-2 mb-1"
            dangerouslySetInnerHTML={{
              __html: description as string | TrustedHTML,
            }}
          ></div>
          <p className="text-orange text-sm flex justify-end gap-2 items-center py-4 pb-5">
            مشاهده بیشتر
            <FaArrowLeft className="w-3 h-3" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
