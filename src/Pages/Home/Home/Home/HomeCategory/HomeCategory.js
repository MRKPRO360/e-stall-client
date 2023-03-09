import HomeCategoryCard from "./HomeCategoryCard";
import img1 from "../../../../../image/hp.jpeg";
import img2 from "../../../../../image/dell.png";
import img3 from "../../../../../image/lenovpng.png";
export default function HomeCategory() {
  return (
    <div className="py-32 sm:py-44">
      <h2 className="text-2xl sm:text-3xl mb-14 text-center font-semibold text-gray-700">
        Category
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 p-5">
        <HomeCategoryCard img={img1} name="hp" />
        <HomeCategoryCard img={img2} name="dell" />
        <HomeCategoryCard img={img3} name="lenovo" />
      </div>
    </div>
  );
}
