import AboutUs from "@/components/home/about-us";
import HerbalTeaProducts from "@/components/home/products/product-gorups/herbaltea-products";
import MedicinalPlantsProducts from "@/components/home/products/product-gorups/medicinal-plants-products";
import OilAndDistillateProducts from "@/components/home/products/product-gorups/oil-distillate-products";
import SpiceProducts from "@/components/home/products/product-gorups/spice-products";
import Slider from "@/components/home/swiper/slider";
import dataSlider from "@/components/home/swiper/swiper-data.json";
import HomeLayout from "@/providers/homeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <div className="bg-BackgroundColor text-white max-w-1770 mx-auto">
        <Slider data={dataSlider} />
        <div className="max-w-1400 mx-auto">
          <HerbalTeaProducts />
          <SpiceProducts />
          <AboutUs />
          <OilAndDistillateProducts />
          <MedicinalPlantsProducts />
        </div>
      </div>
    </HomeLayout>
  );
}
