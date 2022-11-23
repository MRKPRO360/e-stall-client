import { Link } from "react-router-dom";
import img from "../../../../../image/banner.jpg";
export default function HomeBanner() {
  return (
    <div className="justify-between gap-10 p-5 space-y-10 bg-white rounded-md lg:flex lg:space-y-0">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl md:text-4xl">
          Used Laptop in your reach
          <span className="font-bold text-green-500">...</span>
        </h1>
        <p className="mt-6 text-base font-semibold text-gray-700 sm:text-lg sm:mt-9 lg:mt-12 ">
          Solo learn community provide you their best to accomplish your desire.
          Our interactive lesson will boost your programming knowledge to do
          something better in our carrieer.
        </p>
        <div className="flex gap-6 mt-10 text-base font-semibold sm:text-lg lg:mt-20">
          <button
            to="/courses"
            className="flex items-center px-2 py-1 text-white duration-300 bg-green-500 rounded-md shadow-sm cursor-pointer sm:px-4 sm:py-2 hover:bg-green-600 active:bg-green-700 transorm transtion active:translate-y-1 focus:ring-2 focus:ring-offset-4 focus:ring-green-600 shadow-green-300 active:shadow-lg backface-hidden"
          >
            Buy Now
          </button>
          <button className="px-2 py-1 border-4 border-green-500 rounded-md sm:px-4 sm:py-2 ">
            Read More
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
