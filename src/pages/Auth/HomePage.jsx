import CustomCarousel from "../../components/customcarousel/CustomCarousel";
import LatestProducts from "../../components/Products/LatestProducts";
import RecommendationProducts from "../../components/Products/RecommendationProducts";
import { Separator } from "@/components/ui/separator";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <CustomCarousel />

      <div className="mb-10 sm:mx-0 lg:mx-12">
        <LatestProducts />
        <Separator />
      </div>

      <div className="mb-10 sm:mx-0 lg:mx-12">
        <RecommendationProducts />
      </div>
    </div>
  );
};
