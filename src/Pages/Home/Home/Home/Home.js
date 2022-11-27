import Advertised from "../Advertised/Advertised";
import Carousel from "./Carousel/Carousel";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCategory from "./HomeCategory/HomeCategory";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <HomeCategory />
      <Carousel />
      <Advertised />
    </div>
  );
}
