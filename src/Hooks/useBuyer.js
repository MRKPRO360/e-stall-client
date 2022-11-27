import { useEffect, useState } from "react";

export default function useBuyer(email) {
  const [isBuyer, setIsBuyer] = useState(false);

  const [isBuyerLoading, setIsBuyerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const checkBuyer = async function () {
        try {
          const res = await fetch(
            `https://e-stall-server-mrkpro360.vercel.app/users/buyer?email=${email}`
          );

          const data = await res.json();

          if (data) {
            setIsBuyer(data.isBuyer);
            setIsBuyerLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      checkBuyer();
    }
  });

  return [isBuyer, isBuyerLoading];
}
