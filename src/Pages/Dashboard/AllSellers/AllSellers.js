import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AllSellers() {
  const {
    data: sellers = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/users/sellersForAdmin",
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

  const handleDeleteSeller = async function (seller) {
    try {
      const confirm = window.confirm(`Do you want to delete ${seller.name}`);
      const config = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
        },
      };
      if (confirm) {
        const res = await fetch(
          `https://e-stall-server-mrkpro360.vercel.app/users/sellersForAdmin/${seller._id}`,
          config
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          toast.success(`${seller.name} deleted successfully!`, {
            duration: 2500,
          });
          refetch();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async function (seller) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
    };
    try {
      const res = await fetch(
        `https://e-stall-server-mrkpro360.vercel.app/users/sellersForAdmin/${seller._id}?email=${seller.email}`,
        config
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`${seller.name} verified successfully!`, {
          duration: 2500,
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto  w-full">
      {isError && "An unknown error has occured ): Try to reload the page."}
      {!sellers?.length ? (
        <h3 className="text-center font-semibold text-xl">
          There is no seller buddy :(
        </h3>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  {!seller?.verified ? (
                    <button
                      onClick={() => handleVerify(seller)}
                      className="btn-sm btn-process"
                    >
                      Verify
                    </button>
                  ) : (
                    <button className="btn-sm btn-success">Verified</button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteSeller(seller)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
