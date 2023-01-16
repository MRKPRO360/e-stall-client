import { Link } from "react-router-dom";
import img from "../../../../../image/banner.jpg";
export default function HomeBanner() {
  return (
    <div className="justify-between gap-10 px-5 py-4 lg:py-7 space-y-10 bg-white rounded-md lg:flex lg:space-y-0 ">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-700 sm:text-3xl md:text-4xl">
          Used Laptop in your reach
          <span className="font-bold text-green-500">...</span>
        </h1>
        <p className="mt-6 text-base font-semibold text-gray-700 sm:text-lg sm:mt-9 lg:mt-12 ">
          We are offering a huge range of refurbished second hand laptop. Looks
          better, works perfectly well, and meet your needs. We work for you not
          for the sake of our livelihood but for the sake of minds pleasure!
        </p>
        <div className="flex gap-6 mt-10 text-base font-semibold sm:text-lg lg:mt-20">
          <Link to="/category/hp" className="btn-primary-main">
            Buy Now
          </Link>

          <button className="btn-primary-outline btn-primary-outline-fat">
            Know More
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <img
          className="rounded-md h-72 sm:h-[450px] w-full object-cover object-center shadow-md shadow-gray-200 scale-x-[-1]"
          src={img}
          alt="Laptop"
        />
      </div>
    </div>
  );
}
