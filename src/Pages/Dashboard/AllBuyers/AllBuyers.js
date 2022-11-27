import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AllBuyers() {
  const {
    data: buyers = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/users/buyersForAdmin",
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

  const handleDeleteBuyer = async function (buyer) {
    try {
      const confirm = window.confirm(`Do you want to delete ${buyer.name}`);
      const config = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
        },
      };
      if (confirm) {
        const res = await fetch(
          `https://e-stall-server-mrkpro360.vercel.app/users/buyersForAdmin/${buyer._id}`,
          config
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          toast.success(`${buyer.name} deleted successfully!`, {
            duration: 2500,
          });
          refetch();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto  w-full">
      {isError && "An unknown error has occured ): Try to reload the page."}
      {!buyers?.length ? (
        <h3 className="text-center font-semibold text-xl">
          There is no buyer buddy :(
        </h3>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>

                <td>
                  <button
                    onClick={() => handleDeleteBuyer(buyer)}
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
