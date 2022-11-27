import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function OrderItem({ order, refetch }) {
  const { img, name, price } = order;

  const handleDeleteBooking = async function (order) {
    try {
      const confirm = window.confirm(`Do you want to delete ${order.name}`);
      if (confirm) {
        const res = await fetch(
          `https://e-stall-server-mrkpro360.vercel.app/bookings/${order._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
            },
          }
        );
        const data = await res.json();
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${order.name} deleted successfully`, {
            duration: 2500,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl shadow-green-100">
      <figure className="h-80">
        <img className="w-full h-full object-cover" src={img} alt={name} />
      </figure>
      <div className="card-body space-y-3">
        <h2 className="card-title ">
          <span>{name}</span>{" "}
          {!order?.paid ? (
            <Link
              to={`/dashboard/payment/${order._id}`}
              className="ml-auto btn-sm btn-process"
            >
              Pay
            </Link>
          ) : (
            <button className="ml-auto btn-sm btn-success">
              <span className="text-base text-green-800">Paid</span>
            </button>
          )}
        </h2>
        <div className="font-semibold space-y-4">
          <p>Price: ${price}</p>
          {!order?.paid && (
            <button
              onClick={() => handleDeleteBooking(order)}
              className="btn-red"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
