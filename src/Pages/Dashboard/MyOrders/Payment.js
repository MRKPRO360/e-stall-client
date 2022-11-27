import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Spinners from "../../Shared/Spinners";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

export default function Payment() {
  const { id } = useParams();

  const {
    data: booking = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async function () {
      try {
        const res = await fetch(
          `https://e-stall-server-mrkpro360.vercel.app/bookings/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
            },
          }
        );

        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { name } = booking;
  return (
    <div className="p-3 bg-gray-100 w-full rounded flex flex-col items-center ">
      {isLoading && <Spinners />}
      {isError && "An unknown error has occured ): Try to reload the page."}

      <h2 className="text-xl font-semibold">You are purchasing for {name}</h2>
      <div className="my-12 w-96">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
}
