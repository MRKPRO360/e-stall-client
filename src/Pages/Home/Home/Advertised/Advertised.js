import axios from "axios";
import { useEffect, useState } from "react";
import AdvertisedItem from "./AdvertisedItem";
import CategoryModal from "../../../Category/Category/CategoryModal/CategoryModal";

export default function Advertised() {
  const [advertised, setAdvertised] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  useEffect(() => {
    axios
      .get("https://e-stall-server-mrkpro360.vercel.app/advertisedProducts")
      .then(function (response) {
        setAdvertised(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (!advertised.length) return;
  return (
    <div className="my-32">
      <h1 className="text-3xl text-center font-semibold text-gray-700 mb-10">
        Advertised Products
      </h1>
      <div className="flex flex-wrap gap-6 p-5">
        {advertised?.map((el) => (
          <AdvertisedItem
            key={el._id}
            product={el}
            setCategoryData={setCategoryData}
          />
        ))}
        {categoryData._id && (
          <CategoryModal
            categoryData={categoryData}
            setCategoryData={setCategoryData}
          />
        )}
      </div>
    </div>
  );
}
