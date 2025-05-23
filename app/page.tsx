import AboutUs from "@/components/home/about-us";
import BlogList from "@/components/home/blogs/blog-list";
import Slider from "@/components/home/swiper/slider";
import dataSlider from "@/components/home/swiper/swiper-data.json";
import CategoriesList from "@/containers/categories-list";
import HomeLayout from "@/providers/homeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <div className="bg-BackgroundColor text-white max-w-1770 mx-auto pt-20 md:pt-40">
        <Slider data={dataSlider} />
        <div className="max-w-1400 mx-auto">
          <CategoriesList numbers={{ start: 0, end: 2 }} />
          <AboutUs />
          <CategoriesList numbers={{ start: 2, end: 4 }} />
          <BlogList status="group" />
        </div>
      </div>
    </HomeLayout>
  );
}
