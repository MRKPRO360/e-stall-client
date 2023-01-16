import Advertised from "../Advertised/Advertised";
import Clients from "../Clients/Clients";
import Support from "../Support/Support";

import Carousel from "./Carousel/Carousel";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCategory from "./HomeCategory/HomeCategory";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Support />
      <HomeCategory />
      <Advertised />
      <Carousel />
      <Clients />
    </div>
  );
}
