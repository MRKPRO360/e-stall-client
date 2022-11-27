import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ReportedItem() {
  const {
    data: products = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/reportedProducts",
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

  const handleDeleteProduct = async function (product) {
    const config = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
    };

    try {
      const confirm = window.confirm(`Do you want to delete ${product.title}`);
      if (confirm) {
        const res = await fetch(
          `https://e-stall-server-mrkpro360.vercel.app/reportedProducts/${product._id}?productId=${product.productId}`,
          config
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${product.title} deleted successfully!`, {
            duration: 2500,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="overflow-x-auto  w-full">
      {isError && "An unknown error has occured ): Try to reload the page."}
      {!products?.length ? (
        <h3 className="text-center font-semibold text-xl">
          There is no reported product buddy :)
        </h3>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Seller Email</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="w-24 rounded-x">
                    <img src={product.img} alt={product.title} />
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.sellerEmail}</td>
                <td>{product.price}</td>

                <td>
                  <button
                    onClick={() => handleDeleteProduct(product)}
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
