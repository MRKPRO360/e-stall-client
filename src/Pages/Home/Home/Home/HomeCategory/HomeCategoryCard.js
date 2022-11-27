import { Link } from "react-router-dom";

export default function HomeCategoryCard({ img, name }) {
  return (
    <div className="w-96 mt-6 min-h-[330px] flex flex-col justify-between">
      <img src={img} alt={name} />

      <Link to={`/category/${name}`} className="btn-primary-main">
        Visit
      </Link>
    </div>
  );
}
