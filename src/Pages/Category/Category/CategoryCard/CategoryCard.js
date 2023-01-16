import { FaCheck } from "react-icons/fa";
import useAdmin from "../../../../Hooks/useAdmin";
import useSeller from "../../../../Hooks/useSeller";
import { useAuth } from "../../../../Context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const { currentuser } = useAuth();
  const email = currentuser?.email;
  const [isAdmin] = useAdmin(email);
  const [isSeller] = useSeller(email);

  const [isHidden, setIsHidden] = useState(false);

  const handleReportedProduct = async function (product) {
    setIsHidden(true);
    const reportedProduct = {
      img: product.img,
      title: product.name,
      sellerEmail: product.sellerEmail,
      price: product.price,
      productId: product._id,
    };
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
        },
        body: JSON.stringify(reportedProduct),
      };

      const res = await fetch(
        "https://e-stall-server-mrkpro360.vercel.app/reportedProducts",
        config
      );
      const data = await res.json();

      if (data.insertedId) {
        toast.success(`${product.name} reported`, { duration: 2500 });
      }
    } catch (err) {
      console.error(err);
    }
  };

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
            <div className="flex items-center gap-1 p-1 text-sm text-white bg-blue-500 rounded-full">
              <FaCheck />
              <span>Verified</span>
            </div>
          )}
          <div
            className={`${isAdmin && "opacity-0"} ${isSeller && "opacity-0"} ${
              isHidden && "opacity-0"
            } `}
          >
            <button
              onClick={() => handleReportedProduct(category)}
              className="btn-sm btn-red"
            >
              Report
            </button>
          </div>
        </h2>
        <div className="my-5 space-y-2 text-base font-semibold">
          <p>Manufacturer Name: {brand}</p>
          <p className="min-h-[50px]">Specification: {specification}</p>
          <p>Original Price: ${originalPrice}</p>
          <p>Years of purchase: {category?.yearsOfPurchase || 2020}</p>
          <p>Years of use: {yearsOfUse} </p>
          <p>Condition: {conditionType}</p>
          <p>Posted Time: {new Date(postedDate).toDateString()}</p>
          <p>Seller Name: {sellerName}</p>
          <p>Seller Email: {sellerEmail}</p>
          <p>Location: {location}</p>
          <p>Current Price: ${price}</p>
        </div>

        <div className={`${isAdmin && "hidden"} ${isSeller && "hidden"}`}>
          <label
            onClick={() => setCategoryData(category)}
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
