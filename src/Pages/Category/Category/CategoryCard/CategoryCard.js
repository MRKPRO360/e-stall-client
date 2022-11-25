import { FaCheck } from "react-icons/fa";
export default function CategoryCard({ category, setCategoryData }) {
  const {
    img,
    location,
    name: title,
    price,
    originalPrice,
    postedDate,
    sellerName,
    sellerEmail,
    specification,
    verified,
    yearsOfUse,
    conditionType,
    id: brand,
  } = category;

  return (
    <div className="shadow-md shadow-green-200 card w-96 bg-base-100">
      <figure>
        <img
          className="object-cover object-top w-full h-80"
          src={img}
          alt={brand}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {verified && (
            <div className="flex items-center gap-1 p-1 text-sm text-white bg-green-500 rounded-full">
              <FaCheck />
              <span>Verified</span>
            </div>
          )}
        </h2>
        <div className="my-5 space-y-2 text-base font-semibold">
          <p>Manufacturer Name: {brand}</p>
          <p>Specification: {specification}</p>
          <p>Original Price: ${originalPrice}</p>
          <p>Buying Year: {yearsOfUse}</p>
          <p>Condition: {conditionType}</p>
          <p>Posted Time: {new Date(postedDate).toDateString()}</p>
          <p>Seller Name: {sellerName}</p>
          <p>Seller Email: {sellerEmail}</p>
          <p>Location: {location}</p>
          <p>Current Price: ${price}</p>
        </div>
        <label
          onClick={() => setCategoryData(category)}
          htmlFor="my-modal-3"
          className="btn-primary-main"
        >
          Book Now!
        </label>
      </div>
    </div>
  );
}
