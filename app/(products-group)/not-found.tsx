import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="bg-BackgroundColor text-white pt-20 flex justify-center items-center pt-56">
      <div>
        <h2 className="font-extrabold text-8xl text-orange dark:text-gray-100 text-center">
          <span className="sr-only">Error</span>404
        </h2>
        <h3 className="my-2">صفحه‌ای که دنبال آن بودید پیدا نشد!</h3>
        <p className="text-center text-orange mt-5">
          <Link href={"/"}>صفحه‌ی اصلی</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
