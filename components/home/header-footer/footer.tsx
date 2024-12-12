import Link from "next/link";
import React from "react";
import { BsTelegram } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";

const Footer = () => {
  return (
    <div className="bg-BackgroundColor text-white py-10 pt-36 px-5">
      <div className="max-w-1400 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-10 lg:gap-16 items-start">
        <div className="w-full">
          <h4 className="text-lg">درباره ما</h4>
          <p className="mt-7 text-sm lg:text-base text-gray-100 line-clamp-5 md:line-clamp-6 xl:line-clamp-none">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد .
          </p>
        </div>
        <div>
          <h4 className="text-lg">دسترسی سریع</h4>
          <ul className="mt-10 flex flex-col gap-5">
            <li className="text-gray-100">
              <Link href={"/"} className="hover:text-orange">
                صفحه اصلی
              </Link>
            </li>
            <li className="text-gray-100">
              <Link href={"/products"} className="hover:text-orange">
                محصولات
              </Link>
            </li>
            <li className="text-gray-100">
              <button className="hover:text-orange">وبلاگ</button>
            </li>
            <li className="text-gray-100">
              <Link href={"/admin-login"} className="hover:text-orange">
                ادمین
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg">تماس با ما</h4>
          <ul className="mt-10 flex flex-col gap-5">
            <li>
              <p>
                تلفن: <span className="text-gray-300">۰۲۱۳۷۳۳۴۴۶۷</span>
              </p>
            </li>
            <li>
              <p>
                آدرس:
                <span className="text-gray-300"> تهران خ انقلاب .....</span>
              </p>
            </li>
            <li>
              <p>
                ایمیل: <span className="text-gray-300"> arzpour@gmail.com</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex">
            <input
              type="text"
              className="rounded-r w-1/2 bg-BackgroundColor pl-10 pr-4 truncate py-3 text-sm placeholder:text-xs outline-none placeholder:text-gray-400 border border-gray-700 border-l-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="برای ارتباط با ما ایمیل خود را وارد کنید"
            />
            <button
              type="submit"
              className="bg-orange rounded-l px-6 py-2 text-sm"
            >
              ارسال
            </button>
          </div>
          <div className="flex gap-4">
            <BsTelegram className="w-6 h-6 text-gray-200 cursor-pointer" />
            <IoLogoInstagram className="w-6 h-6 text-gray-200 cursor-pointer" />
            <SiWhatsapp className="w-6 h-6 text-gray-200 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
