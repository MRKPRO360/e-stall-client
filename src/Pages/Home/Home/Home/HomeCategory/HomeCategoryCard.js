import { Link } from "react-router-dom";

export default function HomeCategoryCard({ img, name }) {
  return (
    <div className="w-96 mt-6 flex flex-col justify-between items-start shadow-md shadow-green-200 rounded-xl px-3 pb-3">
      <img
        className="h-44 lg:h-60 mb-4 w-full object-cover object-center"
        src={img}
        alt={name}
      />
      <p className="mt-1 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
        placeat? Labore laboriosam porro quis adipisci cumque fugit distinctio
        quisquam, consequuntur sint magnam nesciunt iure ipsum nobis, itaque
        fugiat minima facere!
      </p>
      <Link to={`/category/${name}`} className="btn-primary-main">
        Visit
      </Link>
    </div>
  );
}
