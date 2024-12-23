import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-wrap justify-center lg:flex-nowrap gap-8 items-center my-10 lg:my-14 pt-6">
      <Image
        src="/43135240.png"
        alt="about-us-image"
        width={500}
        height={500}
        className="w-1/2 h-2/5 xl:w-36 lg:h-1/2"
      />
      <div className="mx-10 lg:mx-5">
        <h5 className="pb-6 text-xl text-orange hidden lg:block">درباره ما</h5>
        <p className="text-sm lg:text-base pl-20 leading-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید
          سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
