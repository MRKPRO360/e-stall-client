import { RiDoubleQuotesL } from "react-icons/ri";

export default function Slide({ img, text, client }) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-80 sm:w-auto gap-3 lg:flex-row lg:gap-10">
      <div>
        <img
          className="w-72 mx-auto sm:w-96 h-56 md:w-[490px] shadow-xl sm:h-[360px] rounded-md object-cover"
          src={img}
          alt="client"
        />
      </div>

      <div className="max-w-full  sm:w-[490px] space-y-5 md:space-y-10">
        <RiDoubleQuotesL className="text-3xl sm:text-4xl md:text-6xl text-green-500 " />
        <p className="sm:text-md">{text}</p>

        <div className="mb-8">
          <h4 className=" text-base sm:text-xl">{client}</h4>
        </div>
      </div>
    </div>
  );
}
