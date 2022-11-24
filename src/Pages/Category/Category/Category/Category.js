import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../Shared/Spinners";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryModal from "../CategoryModal/CategoryModal";

export default function Category() {
  const [categoryData, setCategoryData] = useState({});

  const { id } = useParams();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async function () {
      try {
        const res = await fetch(`http://localhost:5000/categories/${id}`);

        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {isLoading && <Spinner />}
      {isError && (
        <h3 className="text-xl font-semibold">
          An unknown error occured ): Try to reload the page
        </h3>
      )}
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
  );
}
