import { useEffect, useState } from "react";

export default function useSeller(email) {
  const [isSeller, setIsSeller] = useState(false);

  const [isSellerLoading, setIsSellerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const checkSeller = async function () {
        try {
          const res = await fetch(`http://localhost:5000/users/seller`);

          const data = await res.json();

          if (data) {
            setIsSeller(data.isSeller);
            setIsSellerLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      checkSeller();
    }
  });

  return [isSellerLoading, isSeller];
}
