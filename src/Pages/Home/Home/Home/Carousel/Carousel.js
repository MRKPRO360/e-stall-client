import img1 from "../../../../../image/upcoming-hpwebp.webp";
import img2 from "../../../../../image/dell-upcoming.jpg";
import img3 from "../../../../../image/upcoming-lenovo.webp";

export default function Carousel() {
  return (
    <div className="my-24">
      <h2 className="text-2xl sm:text-3xl  mb-5 text-center font-semibold text-gray-700">
        Upcoming Products
      </h2>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="flex items-center">
            <img src={img1} className="w-1/2 " alt="hp" />
            <div className="space-y-4 text-gray-700 font-semibold">
              <h3 className="text-2xl">Hp New Spectre Series</h3>
              <p>
                Gigantic processor to come up with whole day activity.
                <br /> Looks beautiful and give you its best.
              </p>
              <button className="btn-primary-main">Advance Book</button>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="flex items-center">
            <img src={img2} className="w-1/2" alt="dell" />
            <div className="space-y-4 text-gray-700 font-semibold">
              <h3 className="text-2xl">Dell New XPS Series</h3>
              <p>
                Enriched specification with 12th gen processor along with robust
                i7 intel processor.
              </p>
              <button className="btn-primary-main">Advance Book</button>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="flex gap-6 items-center">
            <img src={img3} className="w-1/2" alt="lenovo" />
            <div className="space-y-4 text-gray-700 font-semibold">
              <h3 className="text-2xl">Lenovo New Thinkpad Series</h3>
              <p>
                Meets all of the requirement for gaming to day life
                productivity. <br /> Included latest nvidia GPU to tackle
                gaming.
              </p>
              <button className="btn-primary-main">Advance Book</button>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
