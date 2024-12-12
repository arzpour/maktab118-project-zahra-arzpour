import Slider from "@/components/home/swiper/slider";
import dataSlider from "@/components/home/swiper/swiper-data.json";
import HomeLayout from "@/providers/homeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <div className="bg-BackgroundColor text-white min-h-screen max-w-1770 mx-auto">
        <Slider data={dataSlider} />
        <div className="max-w-1400 mx-auto"></div>
      </div>
    </HomeLayout>
  );
}
