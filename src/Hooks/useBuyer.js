import { useEffect, useState } from "react";

export default function useBuyer(email) {
  const [isBuyer, setIsBuyer] = useState(false);

  const [isBuyerLoading, setIsBuyerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const checkBuyer = async function () {
        try {
          const res = await fetch(`http://localhost:5000/users/buyer`);

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

  return [isBuyerLoading, isBuyer];
}
