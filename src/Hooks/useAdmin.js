import { useEffect, useState } from "react";

export default function useAdmin(email) {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const checkAdmin = async function () {
        try {
          const res = await fetch(
            `https://e-stall-server-mrkpro360.vercel.app/users/admin?email=${email}`
          );

          const data = await res.json();

          if (data) {
            setIsAdmin(data.isAdmin);
            setIsAdminLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      checkAdmin();
    }
  });

  return [isAdmin, isAdminLoading];
}
