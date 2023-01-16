import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import person1 from "../../../../image/client-1.jpg";
import person2 from "../../../../image/client-2.jpg";
import person3 from "../../../../image/client-3.jpg";
import person4 from "../../../../image/client-4.jpg";
import Slide from "./Slide";
const slideContent = [
  {
    img: person1,
    text: "I didn't rely on this product first time. But when I was using this laptop then I come to know that their product is reliable.",
    client: "John Smigla",
  },
  {
    img: person2,
    text: "Thanks that I found the website. It not only saved my money but also kept me tensed free.",
    client: "William Harry",
  },
  {
    img: person3,
    text: "Well refurbished product so to say. I have been using their product for a long time without any issue. Highly recommended to purchase their product!",
    client: "Kilian Van",
  },
  {
    img: person4,
    text: "High end laptop with cheap budget. One of my friend suggested me and then I bought a laptop for my son. I realize that the news was really helpful!",
    client: "Marry Cupper",
  },
];

export default function Clients() {
  return (
    <div className="py-24">
      <h2 className="text-2xl sm:text-3xl mb-10 text-center font-semibold text-gray-700">
        Our Clients
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={50}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
      >
        {slideContent.map((el, i) => (
          <SwiperSlide key={i}>
            <Slide client={el.client} img={el.img} text={el.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
