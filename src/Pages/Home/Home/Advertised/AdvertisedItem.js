import { useAuth } from "../../../../Context/AuthContext";
import useAdmin from "../../../../Hooks/useAdmin";
import useSeller from "../../../../Hooks/useSeller";

export default function AdvertisedItem({ product, setCategoryData }) {
  const {
    img,
    location,
    name: title,
    price,
    originalPrice,
    postedDate,
    sellerName,
    specification,
    yearsOfUse,
    id: brand,
  } = product;
  const { currentuser } = useAuth();
  const email = currentuser?.email;
  const [isAdmin] = useAdmin(email);
  const [isSeller] = useSeller(email);

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
        <h2 className="card-title">{title}</h2>
        <div className="my-5 space-y-2 text-base font-semibold">
          <p>Manufacturer Name: {brand}</p>
          <p>Specification: {specification}</p>
          <p>Original Price: ${originalPrice}</p>
          <p>Buying Year: {yearsOfUse}</p>
          <p>Posted Time: {new Date(postedDate).toDateString()}</p>
          <p>Seller Name: {sellerName}</p>
          <p>Location: {location}</p>
          <p>Current Price: ${price}</p>
        </div>
        <div className={`${isAdmin && "hidden"} ${isSeller && "hidden"}`}>
          <label
            onClick={() => setCategoryData(product)}
            htmlFor="my-modal-3"
            className="btn-primary-main"
          >
            Book Now!
          </label>
        </div>
      </div>
    </div>
  );
}
