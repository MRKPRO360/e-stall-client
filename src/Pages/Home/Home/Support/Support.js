import img1 from "../../../../image/f1.png";
import img2 from "../../../../image/f2.png";
import img3 from "../../../../image/f3.png";
import img4 from "../../../../image/f4.png";
import img5 from "../../../../image/f5.png";
import img6 from "../../../../image/f6.png";
import SupportItem from "./SupportItem";

const items = [
  {
    img: img1,
    text: "Free Shipping",
    bg: "bg-cyan-500/60",
  },
  {
    img: img2,
    text: "Online Order",
    bg: "bg-pink-500/40",
  },
  {
    img: img3,
    text: "Save Money",
    bg: "bg-lime-400/40",
  },
  {
    img: img4,
    text: "Promo Items",
    bg: "bg-sky-400/30",
  },
  {
    img: img5,
    text: "Happy Sell",
    bg: "bg-violet-500/40",
  },
  {
    img: img6,
    text: "24/7 Support",
    bg: "bg-orange-400/30",
  },
];

export default function Support() {
  return (
    <div className="flex flex-wrap gap-3 itmes-center justify-center pt-48 pb-20">
      {items.map((el, i) => (
        <SupportItem key={i} img={el.img} text={el.text} bg={el.bg} />
      ))}
    </div>
  );
}
