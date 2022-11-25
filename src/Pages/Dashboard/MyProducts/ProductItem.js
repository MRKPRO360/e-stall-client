import toast from "react-hot-toast";

export default function ProductItem({ product, refetch }) {
  const handleDeleteProduct = async function (id) {
    const confirm = window.confirm("Do you want to delete this product?");
    const config = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
    };
    try {
      if (confirm) {
        const res = await fetch(`http://localhost:5000/products/${id}`, config);
        const data = await res.json();

        if (data.deletedCount > 0) {
          toast.success("Product deleted successfully!", { duration: 2500 });
          refetch();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdvertise = async function (id) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
    };
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, config);
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Product advertised successfully :)", { duration: 2500 });
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { id, img, name, price, specification, _id } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl shadow-green-100">
      <figure className="h-80">
        <img className="w-full h-full object-cover" src={img} alt={name} />
      </figure>
      <div className="card-body space-y-3">
        <h2 className="card-title ">
          <span>{name}</span>{" "}
          <span className="text-sm flex justify-center">({id})</span>
          {product?.paid ? (
            <button className="flex items-center px-2 py-1 duration-200 transform rounded-md bg-green-500/60 active:translate-y-1 ml-auto">
              <span className="text-base text-green-800">Sold</span>
            </button>
          ) : (
            <div className="ml-auto flex gap-1">
              <button className="flex  items-center px-2 py-1 transition duration-200 transform rounded-md bg-green-500/60 active:translate-y-1 shadow-md shadow-green-200">
                <span className="text-base text-green-800">Available</span>
              </button>
              {!product?.advertised && (
                <button
                  onClick={() => handleAdvertise(_id)}
                  className="flex  items-center px-2 py-1 transition duration-200 transform rounded-md bg-yellow-500/60 active:translate-y-1 shadow-md shadow-yellow-200"
                >
                  <span className="text-base text-yellow-900">Advertise</span>
                </button>
              )}
            </div>
          )}
        </h2>
        <div className="font-semibold space-y-2">
          <p>Specification: {specification}</p>
          <p>Price: ${price}</p>
          <button onClick={() => handleDeleteProduct(_id)} className="btn-red">
            Delete This Product
          </button>
        </div>
      </div>
    </div>
  );
}
