import { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Spinners from "../../../Shared/Spinners";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryModal from "../CategoryModal/CategoryModal";

export default function Category() {
  const [categoryData, setCategoryData] = useState({});
  const categories = useLoaderData();

  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <Spinners />}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {categories?.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
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
