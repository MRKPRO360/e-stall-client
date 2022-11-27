import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Spinners from "../../Shared/Spinners";
import ProductItem from "./ProductItem";

export default function MyProducts() {
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/products",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
  // className={`mx-auto h-[${products?.length * 530}px]`}
  return (
    <div className="mx-auto">
      {isLoading && <Spinners />}
      {isError && "An unknown error has occured ): Try to reload the page."}
      {products.length < 1 && (
        <span className="text-xl font-semibold">
          There is no product to show. Please add some{" "}
          <Link
            className="underline decoration-2 decoration-green-500"
            to="/dashboard/addAproduct"
          >
            product
          </Link>
        </span>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {products.length > 0 &&
          products?.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              refetch={refetch}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
