import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinners from "../../Shared/Spinners";
import OrderItem from "./OrderItem";

export default function MyOrders() {
  const {
    data: orders = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/bookings",
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
  return (
    <div className="mx-auto">
      {!isLoading &&
        isError &&
        "An unknown error has occured ): Try to reload the page."}
      {isLoading && <Spinners />}
      {!isLoading && orders?.length === 0 && (
        <span className="text-xl font-semibold">
          There is no booking to show yet. Please add some from{" "}
          <Link
            className="underline decoration-2 decoration-green-500"
            to="/category/hp"
          >
            Hp's
          </Link>{" "}
          or,{" "}
          <Link
            className="underline decoration-2 decoration-green-500"
            to="/category/dell"
          >
            Dell's
          </Link>{" "}
          or,{" "}
          <Link
            className="underline decoration-2 decoration-green-500"
            to="/category/lenovo"
          >
            Lenovo's
          </Link>{" "}
          collections.
        </span>
      )}

      <div className="flex flex-wrap justify-center gap-8 pb-10 ">
        {orders.length > 0 &&
          orders?.map((order) => (
            <OrderItem
              key={order._id}
              id={order._id}
              refetch={refetch}
              order={order}
            />
          ))}
      </div>
    </div>
  );
}
